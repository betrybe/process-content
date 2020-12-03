const util = require('util');
const { exec } = require('child_process');
const core = require('@actions/core');

const bashExec = util.promisify(exec);

const sanitizeExtension = (file) => file.replace(/\.[^/.]+$/, '');

const getExtension = (file) => file.split('.').pop();

const verifyFiles = (file1, file2) => sanitizeExtension(file1).includes(sanitizeExtension(file2))
    && getExtension(file1) !== getExtension(file2);

const getFiles = async (path) => {
  const { stdout, stderr } = await bashExec(`git ls-files ${path}`);

  if (stderr) return core.info('Couldn\'t getFiles because: ', stderr);

  const arrayOfFiles = stdout.split('\n');

  return arrayOfFiles;
};

const groupFiles = (filesArr) => {
  const newArr = [];
  filesArr.reduce((acc, curr) => {
    if (!acc) return curr;

    const filesMatch = verifyFiles(acc, curr);

    if (filesMatch) {
      newArr.push({
        markdown: acc,
        yaml: curr,
      });
    }
  });

  return newArr;
};

const getCommitId = async (path) => {
  const { stdout, stderr } = await bashExec(`git log -n 1 --pretty=format:%H -- ${path}`);

  if (stderr) {
    return console.log('Couldn\`t getCommitIds because: ', stderr);
  }

  return stdout;
};

const getRawContent = async (commitId, path) => {
  const { stdout, stderr } = await bashExec(`git cat-file -p ${commitId}:${path}`);

  if (stderr) {
    return console.log('Couldn\`t getRawContent because:: ', stderr);
  }

  return stdout;
};

const getBuildChapterObj = (type, commitId, rawContent, chapter) => {
  if (type === 'markdown') {
    return {
      ...chapter,
      markdown_commit_id: commitId,
      content_md: rawContent,
    };
  }
  return {
    ...chapter,
    yaml_commit_id: commitId,
    content_yaml: rawContent,
  };
};

const extractFileData = async (chapterObj) => {
  const chapterObjEntriesArray = Object.entries(chapterObj);

  for (const objEntries of chapterObjEntriesArray) {
    const [type, path] = objEntries;
    const commitId = await getCommitId(path);
    const rawContent = await getRawContent(commitId, path);
    return getBuildChapterObj(type, commitId, rawContent, chapterObj);
  }
};

const buildChapters = async (path) => {
  const arrayOfFiles = await getFiles(path);

  const groupedChapters = groupFiles(arrayOfFiles);

  return Promise.all(
    groupedChapters.map((chapterObj) => extractFileData(chapterObj)),
  );
};

module.exports = {
  buildChapters,
  getFiles,
  groupFiles,
  getCommitId,
  getRawContent,
  extractFileData,
  getBuildChapterObj,
};
