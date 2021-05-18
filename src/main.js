require('dotenv').config();
const core = require('@actions/core');
const {
  buildChapters,
  buildAssets,
} = require('./files');
const {
  createChapters,
  createVersion,
  checkForApplication,
} = require('./service');

const processContent = async () => {
  const apiKey = core.getInput('apiKey') || process.env.CONTENT_API_KEY;
  const chapterApiURL = core.getInput('chapterApiURL') || process.env.CONTENT_CHAPTER_API_URL;
  const versionApiURL = core.getInput('versionApiURL') || process.env.CONTENT_VERSION_API_URL;
  const applicationHealthApiURL = core.getInput('applicationHealthApiURL') || process.env.APPLICATION_HEALTH_API_URL;
  const filesPath = core.getInput('contentPath') || process.env.FILES_PATH;
  const assetsFilesPath = core.getInput('assetPath') || process.env.ASSETS_PATH;
  const pullRequestMergedAt = Date.parse(core.getInput('pullRequestMergedAt')) || Date.parse(new Date());
  const pullRequestMergeCommitId = core.getInput('pullRequestMergeCommitId') || process.env.COMMIT_ID;
  const pullRequestId = core.getInput('pullRequestId') || process.env.PULL_REQUEST_ID;

  const arrayOfAssets = await buildAssets(assetsFilesPath);

  core.info(`::Check ${applicationHealthApiURL}::`);
  const { applicationReady } = await checkForApplication(applicationHealthApiURL, apiKey);

  if (!applicationReady) {
    throw new Error('Application deployment isn`t available');
  }

  const arrayOfChapters = await buildChapters(filesPath);
  const {
    results,
    success,
  } = await createChapters(arrayOfChapters, arrayOfAssets, chapterApiURL, apiKey);

  if (!success) {
    throw new Error('A New Version Couldn`t be created due to error when creating a chapter');
  }

  const bodyParams = {
    merge_commit_id: pullRequestMergeCommitId,
    pull_request_merged_at: pullRequestMergedAt,
    pull_request_id: pullRequestId,
    chapter_ids: results,
  };

  return createVersion(versionApiURL, apiKey, bodyParams);
};

module.exports = {
  processContent,
};
