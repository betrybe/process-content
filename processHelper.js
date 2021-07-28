const { spawn } = require('child_process');

const spawnProcess = (opts, ...args) => {
  const process = spawn(...args, opts);
  const processOutput = {
    stdout: '',
    stderr: '',
  };

  return new Promise((resolve, reject) => {
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
      if (code === 0) return resolve(processOutput.stdout);
      return reject(processOutput.stderr);
    });
  });
};

module.exports = {
  spawnProcess,
};
