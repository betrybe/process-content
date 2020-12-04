const core = require('@actions/core');
const util = require('util');
const { exec } = require('child_process');

const bashExec = util.promisify(exec);

const sanitizeExtension = (file) => file.replace(/\.[^/.]+$/, '');

const getExtension = (file) => file.split('.').pop();

const verifyFileMatching = (file1, file2) =>
  sanitizeExtension(file1).includes(sanitizeExtension(file2))
  && getExtension(file1) !== getExtension(file2);

const sanitizeFilesArray = (fileArray) =>
  fileArray.split('\n').filter((file) => getExtension(file) !== 'eex' && file !== '');

const getFiles = async (path) => {
  const { stdout, stderr } = await bashExec(`git ls-files ${path}`);

  if (stderr) return core.info('Error at getFiles because: ', stderr);

  const arrayOfFiles = sanitizeFilesArray(stdout);

  return arrayOfFiles;
};

const getCommitId = async (path) => {
  const { stdout, stderr } = await bashExec(`git log -n 1 --pretty=format:%H -- ${path}`);

  if (stderr) {
    return console.log('Error at getCommitIds because: ', stderr);
  }

  return stdout;
};

const getRawContent = async (commitId, path) => {
  const { stdout, stderr } = await bashExec(`git cat-file -p ${commitId}:${path}`);

  if (stderr) {
    return console.log('Error at getRawContent because:: ', stderr);
  }

  return stdout;
};

const buildChapterObj = async (chapterObj) => {
  const { markdownPath, yamlPath } = chapterObj;

  const markdownCommitId = await getCommitId(markdownPath);

  const yamlCommitId = await getCommitId(yamlPath);

  const contentMd = await getRawContent(markdownCommitId, markdownPath);

  const contentYaml = await getRawContent(yamlCommitId, yamlPath);

  return {
    ...chapterObj,
    markdownCommitId,
    yamlCommitId,
    contentMd,
    contentYaml,
  };
};

const groupFiles = (filesArr) => {
  return filesArr.reduce((acc, curr, index, array) => {
    if (index === array.length) return acc;

    if (getExtension(curr).includes('yaml')) return acc;

    const filesMatch = verifyFileMatching(curr, array[index + 1]);

    if (filesMatch) {
      const markdownPath = curr;
      const yamlPath = array[index + 1];

      return [...acc, { markdownPath, yamlPath }];
    }

    return acc;
  }, [])
}

const buildChapters = async (path) => {
  const arrayOfFiles = await getFiles(path);

  const chapterArrayOfObj = groupFiles(arrayOfFiles);

  return await Promise.all(
    chapterArrayOfObj.map(chapterObj => buildChapterObj(chapterObj))
  )
};

module.exports = {
  buildChapters,
  getFiles,
  groupFiles,
  getCommitId,
  getRawContent,
  buildChapterObj,
};
