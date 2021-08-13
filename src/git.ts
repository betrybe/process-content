import { exec } from 'child_process';
import util from 'util';
import logger from './logger';
import { spawnProcess } from '../processHelper';

const bashExec = util.promisify(exec);

export const getFiles = async (path: string) => {
  const { stdout, stderr } = await bashExec(`git ls-files ${path} ':!:${path}/basket-of-unused-content*'`);

  if (stderr) return logger.info({ message: `Error at getFiles because: ${stderr}` });

  return stdout;
};

export const getCommitId = async (path: string) => {
  const { stdout, stderr } = await bashExec(`git log -n 1 --pretty=format:%H -- ${path}`);

  if (stderr) return logger.info({ message: `Error at getCommitIds because: ${stderr}` });

  return stdout;
};

export const getBlobContent = async (commitId: string, path: string) => {
  const { stdout, stderr } = await spawnProcess('git', ['cat-file', '-p', `${commitId}:${path}`]);

  if (stderr) return logger.info({ message: `Error at getRawContent because: ${stderr}` });

  return stdout;
};
