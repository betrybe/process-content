const { spawn } = require('child_process');

const spawnProcess = (...args) => {
  const process = spawn(...args);
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
      if (code === 0) return resolve(processOutput);
      return reject(processOutput);
    });
  });
};

module.exports = {
  spawnProcess,
};
