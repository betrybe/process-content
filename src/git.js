const { exec } = require('child_process');
const util = require('util');
const logger = require('./logger');
const { spawnProcess } = require('../processHelper');

const bashExec = util.promisify(exec);

const getFiles = async (path) => {
  const { stdout, stderr } = await bashExec(`git ls-files ${path} ':!:priv/markdown_templates/content/basket-of-unused-content*'`);

  if (stderr) return logger.info({ message: `Error at getFiles because: ${stderr}` });

  return stdout;
};

const getCommitId = async (path) => {
  const { stdout, stderr } = await bashExec(`git log -n 1 --pretty=format:%H -- ${path}`);

  if (stderr) return logger.info({ message: `Error at getCommitIds because: ${stderr}` });

  return stdout;
};

const getBlobContent = async (commitId, path) => {
  const { stdout, stderr } = await spawnProcess('git', ['cat-file', '-p', `${commitId}:${path}`]);

  if (stderr) return logger.info({ message: `Error at getRawContent because: ${stderr}` });

  return stdout;
};

module.exports = {
  getFiles,
  getCommitId,
  getBlobContent,
  spawnProcess,
};
