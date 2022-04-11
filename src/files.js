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

  const sanitizedArrayOfFiles = utils.sanitizeFilesArray(arrayOfFiles);

  const chapterArrayOfObj = groupFiles(sanitizedArrayOfFiles);

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

const getAssetsFiles = async (assetsPath) => {
  const arrayOfAssets = await gitCommands.getFiles(assetsPath);

  const sanitizedArrayOfAssets = utils.sanitizeFilesArray(arrayOfAssets);

  return sanitizedArrayOfAssets;
};

const processAssetContent = async (assetPath) => {
  const { assetContent } = await extractFileInfo(assetPath);

  const assetContentMd5 = generateContentMd5Hash(assetPath, assetContent);
  const assetUrlHash = buildAssetHashUrl(assetPath, assetContentMd5);

  const location = await s3.uploadToBucket(assetUrlHash, assetPath);
  const s3UrlLocation = utils.urlSanitizer(location);
  const relativeAssetPath = assetPath.split('static').pop();
  core.info(`Asset: ${s3UrlLocation} sucessfully uploaded`);
  core.info(`Assert relative (${relativeAssetPath}) : ${utils.useCachedUrl(s3UrlLocation)}`);
  return { [relativeAssetPath]: utils.useCachedUrl(s3UrlLocation) };
};

const chunkArray = (myArray, chunkSize) => {
  const results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }

  return results;
};

const createFilesChunk = (arrayOfChapters) => chunkArray(arrayOfChapters, 100);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const buildAssets = async (assetsPath) => {
  const arrayOfAssets = await getAssetsFiles(assetsPath);
  core.info(`Processing ${arrayOfAssets.length} Assets`);

  const groupOfAssets = createFilesChunk(arrayOfAssets);

  core.info(`Número de Grupos: #${groupOfAssets.length}`);

  const result = await groupOfAssets.reduce((chain, assets, index) => (
    chain.then(async (previousResults) => {
      core.info(`Iniciando upload de grupo ${(index + 1)}...`);

      const responses = await Promise.all(
        assets.map((assetPath) => processAssetContent(assetPath)),
      );

      await sleep(1000);
      return [...responses, ...previousResults || []];
    })
  ), Promise.resolve());

  return result;
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
