const core = require('@actions/core');
const crypto = require('crypto');
const gitCommands = require('./git');
const s3 = require('./s3');

const sanitizeExtension = (file) => file.replace(/\.[^/.]+$/, '');

const getExtension = (file) => file.split('.').pop();

const verifyFileMatching = (file1, file2) =>
  sanitizeExtension(file1).includes(sanitizeExtension(file2))
  && getExtension(file1) !== getExtension(file2);

const sanitizeFilesArray = (fileArray) =>
  fileArray.split('\n').filter((file) => getExtension(file) !== 'eex' && file !== '' && getExtension(file) !== 'mp4');

const extractFileInfo = async (path) => {
  const commitId = await gitCommands.getCommitId(path);
  const blobContent = await gitCommands.getBlobContent(commitId, path);

  if (getExtension(path) === 'md') {
    return {
      markdownCommitId: commitId,
      contentMd: blobContent,
    };
  } if (getExtension(path) === 'yaml') {
    return {
      yamlCommitId: commitId,
      contentYaml: blobContent,
    };
  }

  return { assetBlob: blobContent };
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

const buildAssetHashUrl = (path, blobHash) => {
  const extension = getExtension(path);
  const pathSuffix = path.substring(0, path.lastIndexOf('.'));
  const newHashUrl = `${pathSuffix}-${blobHash}.${extension}`;

  return newHashUrl;
};

const generateHashOfAssetBlob = (assetBlob) => {
  const blobMd5 = crypto.createHash('md5').update(assetBlob).digest('hex');
  return blobMd5;
};

const getAssetsFiles = async (path) => {
  const arrayOfAssets = await gitCommands.getFiles(path);

  const sanitizedArrayOfAssets = sanitizeFilesArray(arrayOfAssets);

  return sanitizedArrayOfAssets;
};

const processAssetContent = async (assetPath) => {
  const { assetBlob } = await extractFileInfo(assetPath);
  const assetBlobMd5 = generateHashOfAssetBlob(assetPath, assetBlob);
  const fileType = getExtension(assetPath);
  const assetUrlHash = buildAssetHashUrl(assetPath, assetBlobMd5);

  await s3.uploadToBucket(assetUrlHash, assetPath, fileType);

  return { [assetPath]: assetUrlHash };
};

const buildAssets = async (path) => {
  const arrayOfAssets = await getAssetsFiles(path);

  core.info(`Processing ${arrayOfAssets.length} assets`);
  return Promise.all(
    arrayOfAssets.map((assetPath) => processAssetContent(assetPath)),
  );
};

module.exports = {
  buildChapters,
  groupFiles,
  buildChapterObj,
  extractFileInfo,
  buildAssets,
  generateHashOfAssetBlob,
  buildAssetHashUrl,
  processAssetContent,
};
