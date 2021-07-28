const { exec } = require('child_process');
const util = require('util');
const utils = require('./utils');
const logger = require('./logger');
const { spawnProcess } = require('../processHelper');
const { stdout, exit } = require('process');
const path = require('path')

const bashExec = util.promisify(exec)

const getFiles = async (path) => {
  try {
    const gitRoot = await getGitRoot(path);  

    const {stdout, _} = await bashExec(`git ls-files ':!:./basket-of-unused-content*' --full-name`, {cwd: path});
    const sanitizedArrayOfFiles = utils.sanitizeFilesArray(stdout);    

    return sanitizedArrayOfFiles.map((f) => `${gitRoot}/${f}`)

  } catch(error) {
    return logger.info({ message: `Error at getFiles because: ${error.stderr}` });
  }
};

const getCommitId = async (path) => {
  try {
    const { stdout, _ } = await bashExec(`git log -n 1 --pretty=format:%H`, path);
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
