const core = require('@actions/core');
const { exec } = require('child_process');
const util = require('util');

const bashExec = util.promisify(exec);

const getFiles = async (path) => {
  const { stdout, stderr } = await bashExec(`git ls-files ${path}`);

  if (stderr) return core.info('Error at getFiles because: ', stderr);

  return stdout;
};

const getCommitId = async (path) => {
  const { stdout, stderr } = await bashExec(`git log -n 1 --pretty=format:%H -- ${path}`);

  if (stderr) {
    return core.info('Error at getCommitIds because: ', stderr);
  }

  return stdout;
};

const getBlobContent = async (commitId, path) => {
  const { stdout, stderr } = await bashExec(`git cat-file -p ${commitId}:${path}`);

  if (stderr) {
    return core.info('Error at getRawContent because:: ', stderr);
  }

  return stdout;
};

module.exports = {
  getFiles,
  getCommitId,
  getBlobContent,
};
