import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

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

  const timeoutSeconds = Math.ceil(timeoutMs / 1000);  // always integer
  const codeBase64 = Buffer.from(code, "utf8").toString("base64");
  const safeInput = input.replace(/"/g, '\\"');

  const cmd = [
  `echo "${safeInput}" |`,
  "docker run --rm",
  "--network none",
  "--cpus 0.5",
  "--memory 512m",
  "--tmpfs /tmp:rw,size=64m,exec",  // ← Agregar "exec" aquí
  "--read-only",
  "-i",
  `-e CODE_B64=${codeBase64}`,
  `-e TIMEOUT=${timeoutSeconds}`,
  image
].join(" ");

  try {
    const { stdout } = await execAsync(cmd, { timeout: timeoutMs + 500 });
    return JSON.parse(stdout.trim());
  } catch (err) {
    try {
      return JSON.parse(err.stdout || err.stderr);
    } catch {
      return { success: false, error: "Runner crashed", output: "" };
    }
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
