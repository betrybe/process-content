require('dotenv').config();
const core = require('@actions/core');
const {
  buildChapters,
} = require('./files');
const {
  createChapters,
  createVersion,
} = require('./service');

const processContent = async () => {
  const apiKey = core.getInput('apiKey') || process.env.CONTENT_API_KEY;
  const chapterApiURL = core.getInput('chapterApiURL') || process.env.CONTENT_CHAPTER_API_URL;
  const versionApiURL = core.getInput('versionApiURL') || process.env.CONTENT_VERSION_API_URL;
  const filesPath = core.getInput('contentPath') || process.env.FILES_PATH;
  const assetsFilesPath = core.getInput('assetPath') || process.env.ASSETS_PATH;
  const mergedAt = core.getInput('mergedAt') || Date.parse(new Date());
  const mergeCommitId = core.getInput('mergeCommitId') || '7044d626ad61a8011a0ee8ad78e16c89f3c781f7';

  // const arrayOfAssets = await buildAssets(assetsFilesPath);
  const arrayOfChapters = await buildChapters(filesPath);
  const { results, success } = await createChapters(arrayOfChapters, chapterApiURL, apiKey);

  if (!success) {
    throw new Error('A New Version Couldn`t be created due to error when creating a chapter');
  }

  return createVersion(versionApiURL, results, apiKey, mergedAt, mergeCommitId);
};

module.exports = {
  processContent,
};
