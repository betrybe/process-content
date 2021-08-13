import { spawn } from 'child_process';

type StandardOutput = {
  stdout: string;
  stderr: string;
}

export const spawnProcess = (args: string, options: string[]) => {
  const process = spawn(args, options);
  const processOutput = {
    stdout: '',
    stderr: '',
  };

  return new Promise<StandardOutput>((resolve, reject) => {
    if (process.stdout) {
      process.stdout.on('data', (data) => {
        processOutput.stdout += data;
      });
    }

    if (process.stderr) {
      process.stderr.on('data', (data) => {
        processOutput.stderr += data;
      });
    }

    process.on('error', reject);
    process.on('close', (code) => {
      if (code === 0) return resolve(processOutput);
      return reject(processOutput);
    });
  });
};