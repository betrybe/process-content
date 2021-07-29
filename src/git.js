const { exec } = require('child_process');
const util = require('util');
const utils = require('./utils');
const logger = require('./logger');
const { spawnProcess } = require('../processHelper');
const { stdout, exit } = require('process');
const path = require('path')

const bashExec = util.promisify(exec)

const getFiles = async (directory) => {
  try {
    const gitRoot = await getGitRoot(directory);  

    const {stdout, _} = await bashExec(`git ls-files ':!:./basket-of-unused-content*' --full-name`, {cwd: directory});

    const sanitizedArrayOfFiles = utils.sanitizeFilesArray(stdout);    

    return sanitizedArrayOfFiles.map((f) => path.join(gitRoot,f))

  } catch(error) {
    return logger.info({ message: `Error at getFiles because: ${error.stderr}` });
  }
};

const getCommitId = async (file) => {
  try {
    gitRoot = await getGitRoot(file);
    const { stdout, _ } = await bashExec(`git log -n 1 --pretty=format:%H -- ${file}`, {cwd: gitRoot});
    return stdout;
  } catch (error) {
    return logger.info({ message: `Error at getCommitIds because: ${error.stderr}` });
  }
};

const getGitRoot = async(dir_or_file) => {
  try {
    directory = path.dirname(dir_or_file);
    const {stdout, _stderr} = await bashExec("git rev-parse --show-toplevel", {cwd: directory});
    return stdout.trim();
  } catch (error) {
    return logger.info({ message: `Error at getGitRoot: ${error}` });
  }
}

const getBlobContent = async (commitId, file) => {
  try {
    gitRoot = await getGitRoot(file);
    file = path.relative(gitRoot, file);
    return await spawnProcess({ cwd: gitRoot}, 'git', ['cat-file', '-p', `${commitId}:${file}`]);
  } catch (error) {
    return logger.info({ message: `Error at getRawContent because: ${error}` });
  }
}

module.exports = {
  getFiles,
  getCommitId,
  getBlobContent,
  spawnProcess,
  getGitRoot,
};
