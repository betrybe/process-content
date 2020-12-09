const gitCommands = require('./git');

const sanitizeExtension = (file) => file.replace(/\.[^/.]+$/, '');

const getExtension = (file) => file.split('.').pop();

const verifyFileMatching = (file1, file2) =>
  sanitizeExtension(file1).includes(sanitizeExtension(file2))
  && getExtension(file1) !== getExtension(file2);

const sanitizeFilesArray = (fileArray) =>
  fileArray.split('\n').filter((file) => getExtension(file) !== 'eex' && file !== '');

const extractFileInfo = async (path) => {
  const commitId = await gitCommands.getCommitId(path);
  const blobContent = await gitCommands.getBlobContent(commitId, path);

  if (getExtension(path) === 'md') {
    return {
      markdownCommitId: commitId,
      contentMd: blobContent,
    };
  }
  return {
    yamlCommitId: commitId,
    contentYaml: blobContent,
  };
};

const buildChapterObj = async (chapterObj) => {
  const { markdownPath, yamlPath } = chapterObj;

  const markdownObj = await extractFileInfo(markdownPath);
  const markdownYaml = await extractFileInfo(yamlPath);

  return {
    path: markdownPath,
    ...markdownObj,
    ...markdownYaml,
  };
};

const groupFiles = (filesArr) => filesArr.reduce((groupedFiles, currentPath, index, array) => {
  if (index === array.length) return groupedFiles;

  if (getExtension(currentPath).includes('yaml')) return groupedFiles;

  const filesMatch = verifyFileMatching(currentPath, array[index + 1]);

  if (filesMatch) {
    const markdownPath = currentPath;
    const yamlPath = array[index + 1];

    return [...groupedFiles, { markdownPath, yamlPath }];
  }

  return groupedFiles;
}, []);

const buildChapters = async (path) => {
  const arrayOfFiles = await gitCommands.getFiles(path);

  const sanitizedArrayOfFiles = sanitizeFilesArray(arrayOfFiles);

  const chapterArrayOfObj = groupFiles(sanitizedArrayOfFiles);

  return Promise.all(
    chapterArrayOfObj.map((chapterObj) => buildChapterObj(chapterObj)),
  );
};

module.exports = {
  buildChapters,
  groupFiles,
  buildChapterObj,
  extractFileInfo,
};
