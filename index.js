require('dotenv').config();
const core = require('@actions/core');
const {
  buildChapters,
} = require('./files');
const {
  createChapters,
  createVersion,
} = require('./service');

async function run() {
  try {
    core.info('Tryhard Action Rolling');

    const apiKey = core.getInput('apiKey') || process.env.CONTENT_API_KEY;
    const chapterApiURL = core.getInput('chapterApiURL') || process.env.CONTENT_CHAPTER_API_URL;
    const versionApiURL = core.getInput('versionApiURL') || process.env.CONTENT_VERSION_API_URL;
    const mergedAt = core.getInput('mergedAt') || Date.parse(new Date());
    const mergeCommitId = core.getInput('mergeCommitId') || '7044d626ad61a8011a0ee8ad78e16c89f3c781f7';
    const filesPath = core.getInput('dirPath') || process.env.FILES_PATH;

    const arrayOfChapters = await buildChapters(filesPath);
    const { results, success } = await createChapters(arrayOfChapters, chapterApiURL, apiKey);

    if (!success) {
      throw new Error('A New Version Couldn`t be created due to error when creating a chapter');
    }

    await createVersion(versionApiURL, results, apiKey, mergedAt, mergeCommitId);

    core.info('A new version of chapter was created with success');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
