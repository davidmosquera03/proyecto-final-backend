import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class RunnerService {
  private readonly logger = new Logger(RunnerService.name);

  async runCode(
    language: string,
    code: string,
    input: string,
    timeoutMs: number
  ): Promise<{ success: boolean; output: string; timeMs?: number; error?: string }> {

    const image = this.getImage(language);
    if (!image) throw new Error(`Unsupported language: ${language}`);
    // Java gets more time (industry-standard multiplier)
    if (language.toUpperCase() === "JAVA") {
      timeoutMs = timeoutMs * 2;
    }
    const timeoutSeconds = Math.ceil(timeoutMs / 1000);
    const codeBase64 = Buffer.from(code, "utf8").toString("base64");

    const dockerArgs = [
      'run', '--rm',
      '--network', 'none',
      '--cpus', '0.5',
      '--memory', '512m',
      '--tmpfs', '/tmp:rw,size=64m,exec',
    ];

    if (language.toUpperCase() !== 'JAVA') {
      dockerArgs.push('--read-only');
    }

    dockerArgs.push(
      '-i',
      '-e', `CODE_B64=${codeBase64}`,
      '-e', `TIMEOUT=${timeoutSeconds}`,
      image
    );

    return new Promise((resolve) => {
      const proc = spawn('docker', dockerArgs);
      
      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (data) => stdout += data.toString());
      proc.stderr.on('data', (data) => stderr += data.toString());

      // Write input to stdin
      proc.stdin.write(input);
      proc.stdin.end();

      proc.on('close', (code) => {
        this.logger.debug(`Docker exit code: ${code}`);
        this.logger.debug(`STDOUT: ${stdout}`);
        this.logger.debug(`STDERR: ${stderr}`);

        try {
          resolve(JSON.parse(stdout.trim()));
        } catch {
          resolve({ success: false, error: "Runner crashed", output: "" });
        }
      });

      // Timeout
      setTimeout(() => {
        proc.kill();
        resolve({ success: false, error: "Process timeout", output: "" });
      }, timeoutMs + 1000);
    });
  }

  private getImage(language: string): string | null {
    switch (language.toUpperCase()) {
      case 'PYTHON': return 'runner-python';
      case 'CPP': return 'runner-cpp';
      case 'JAVA': return 'runner-java';
      case 'JAVASCRIPT':return 'runner-node';
      default: return null;
    }
  }
}