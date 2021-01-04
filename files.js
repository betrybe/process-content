const crypto = require('crypto');
const gitCommands = require('./git');
const s3 = require('./s3');

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

const buildAssetHashUrl = (path, blob) => {
  const extension = getExtension(path);
  const pathSuffix = path.substring(0, path.lastIndexOf('.'));

  return `${pathSuffix}-${blob}.${extension}`;
};

const generateHashOfAssetBlob = async (path, assetBlob) => {
  const blobMd5 = await crypto.createHash('md5').update(assetBlob).digest('hex');
  const newUrl = buildAssetHashUrl(path, blobMd5);

  return newUrl;
};

const getAssetsFiles = async (path) => {
  const arrayOfAssets = await gitCommands.getFiles(path);

  const sanitizedArrayOfAssets = sanitizeFilesArray(arrayOfAssets);

  return sanitizedArrayOfAssets;
};

const processAssetContent = async (assetPath, awsAccessKey, awsSecret) => {
  const { assetBlob } = await extractFileInfo(assetPath);
  const assetUrlHash = await generateHashOfAssetBlob(assetPath, assetBlob);

  const s3BucketClient = s3.awsClientS3(awsAccessKey, awsSecret);
  await s3.uploadToBucket(s3BucketClient, assetBlob, assetUrlHash);

  return { [assetPath]: assetUrlHash };
};

const buildAssets = async (path, awsAccessKey, awsSecret) => {
  const arrayOfAssets = await getAssetsFiles(path);

  return Promise.all(
    arrayOfAssets.map((assetPath) => processAssetContent(assetPath, awsAccessKey, awsSecret)),
  );
};

module.exports = {
  buildChapters,
  groupFiles,
  buildChapterObj,
  extractFileInfo,
  buildAssets,
};
