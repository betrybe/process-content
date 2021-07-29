const core = require('@actions/core');
const crypto = require('crypto');
const path = require('path');
const gitCommands = require('./git');
const s3 = require('./s3');
const utils = require('./utils');

const extractFileInfo = async (filePath) => {
  const commitId = await gitCommands.getCommitId(filePath);
  const blobContent = await gitCommands.getBlobContent(commitId, filePath);

  if (path.extname(filePath) === '.md') {
    return {
      markdownCommitId: commitId,
      contentMd: blobContent,
    };
  } if (path.extname(filePath) === '.yaml') {
    return {
      yamlCommitId: commitId,
      contentYaml: blobContent,
    };
  }

  return { assetContent: blobContent };
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

  if (path.extname(currentPath).includes('.yaml')) return groupedFiles;
  const filesMatch = utils.verifyFileMatching(currentPath, array[index + 1]);

  if (filesMatch) {
    const markdownPath = currentPath;
    const yamlPath = array[index + 1];

    return [...groupedFiles, { markdownPath, yamlPath }];
  }

  return groupedFiles;
}, []);

const buildChapters = async (chapterPath) => {
  const arrayOfFiles = await gitCommands.getFiles(chapterPath);
  const chapterArrayOfObj = groupFiles(arrayOfFiles);
  core.info(`Processing ${chapterArrayOfObj.length} Chapters`);
  return Promise.all(
    chapterArrayOfObj.map((chapterObj) => buildChapterObj(chapterObj)),
  );
};

const buildAssetHashUrl = (assetPath, blobHash) => {
  const extension = path.extname(assetPath);
  const pathSuffix = assetPath.substring(0, assetPath.lastIndexOf('.')).split('static/').pop();
  const newHashUrl = `${pathSuffix}-${blobHash}${extension}`;

  return newHashUrl;
};

const generateContentMd5Hash = (fileContent) => {
  const contentMd5 = crypto.createHash('md5').update(fileContent).digest('hex');
  return contentMd5;
};

const getAssetsFiles = async (assetsPath) => gitCommands.getFiles(assetsPath);

const processAssetContent = async (assetPath) => {
  const { assetContent } = await extractFileInfo(assetPath);

  const assetContentMd5 = generateContentMd5Hash(assetPath, assetContent);
  const assetUrlHash = buildAssetHashUrl(assetPath, assetContentMd5);

  const location = await s3.uploadToBucket(assetUrlHash, assetPath);
  const s3UrlLocation = utils.urlSanitizer(location);
  const relativeAssetPath = assetPath.split('static').pop();
  core.info(`Asset: ${s3UrlLocation} sucessfully uploaded`);
  return { [relativeAssetPath]: s3UrlLocation };
};

const buildAssets = async (assetsPath) => {
  const arrayOfAssets = await getAssetsFiles(assetsPath);
  core.info(`Processing ${arrayOfAssets.length} Assets`);
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
  generateContentMd5Hash,
  buildAssetHashUrl,
  processAssetContent,
};
