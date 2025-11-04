import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

@Injectable()
export class RunnerService {
  private readonly logger = new Logger(RunnerService.name);

  /* async runCode(language: string, code: string): Promise<{ output: string }> {
    const image = this.getImage(language);
    if (!image) throw new Error(`Unsupported language: ${language}`);

    const cmd = [
    'docker', 'run', '--rm',
    '--network', 'none',
    '--cpus', '0.5',
    '--memory', '512m',
    '--tmpfs', '/tmp:rw,size=64m',
    '--read-only',
    '-e', `CODE='${code.replace(/'/g, "'\\''")}'`,
    image
    ];

    try {
      const { stdout } = await execAsync(cmd.join(' '), { timeout: 10000 });
      return { output: stdout.trim() };
    } catch (err) {
      this.logger.error(err);
      return { output: err.stdout || err.stderr || 'Execution failed' };
    }
  } */

async runCode(language: string, code: string): Promise<{ output: string }> {
  const image = this.getImage(language);
  if (!image) throw new Error(`Unsupported language: ${language}`);

  const input = "2\n4\n";
  const escapedCode = code.replace(/'/g, "'\\''");

  const cmd = [
    `echo "${input}" |`,
    'docker run --rm',
    '--network none',
    '--cpus 0.5',
    '--memory 512m',
    '--tmpfs /tmp:rw,size=64m',
    '--read-only',
    '-i', 
    '-e', `CODE='${escapedCode}'`,
    image
  ].join(' ');

  try {
    const { stdout } = await execAsync(cmd, { timeout: 10000 });
    return { output: stdout.trim() };
  } catch (err) {
    this.logger.error(err);
    return { output: err.stdout || err.stderr || 'Execution failed' };
  }
}


  private getImage(language: string): string | null {
    switch (language.toUpperCase()) {
      case 'PYTHON': return 'runner-python';
      case 'CPP': return 'runner-cpp';
      case 'JAVA': return 'runner-java';
      default: return null;
    }
  }

  private escapeEnv(code: string): string {
    return code.replace(/(["`$\\])/g, '\\$1');
  }
}
