const { exec } = require('child_process');
const path = require('path');
const util = require('util');
const utils = require('./utils');
const logger = require('./logger');
const { spawnProcess } = require('../processHelper');

const bashExec = util.promisify(exec);

const getGitRoot = async (dirOrFile) => {
  try {
    const directory = path.dirname(dirOrFile);
    const { stdout } = await bashExec('git rev-parse --show-toplevel', { cwd: directory });
    return stdout.trim();
  } catch (error) {
    return logger.error({ message: `Error at getGitRoot: ${error}` });
  }
};

const getFiles = async (directory) => {
  try {
    const gitRoot = await getGitRoot(directory);
    const { stdout } = await bashExec('git ls-files \':!:./basket-of-unused-content*\' --full-name', { cwd: directory });
    const sanitizedArrayOfFiles = utils.sanitizeFilesArray(stdout);
    return sanitizedArrayOfFiles.map((f) => path.join(gitRoot, f));
  } catch (error) {
    return logger.error({ message: `Error at getFiles because: ${error.stderr}` });
  }
};

const getCommitId = async (file) => {
  try {
    const gitRoot = await getGitRoot(file);
    const { stdout } = await bashExec(`git log -n 1 --pretty=format:%H -- ${file}`, { cwd: gitRoot });
    return stdout;
  } catch (error) {
    return logger.error({ message: `Error at getCommitIds because: ${error.stderr}` });
  }
};

const getBlobContent = async (commitId, file) => {
  try {
    const gitRoot = await getGitRoot(file);
    const relativePath = path.relative(gitRoot, file);
    return await spawnProcess({ cwd: gitRoot }, 'git', ['cat-file', '-p', `${commitId}:${relativePath}`]);
  } catch (error) {
    return logger.error({ message: `Error at getRawContent because: ${error}` });
  }
};

module.exports = {
  getFiles,
  getCommitId,
  getBlobContent,
  spawnProcess,
  getGitRoot,
};
