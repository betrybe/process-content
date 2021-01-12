require('dotenv').config();
const core = require('@actions/core');
const {
  buildChapters,
  buildAssets,
} = require('./files');
const {
  createChapters,
} = require('./service');

async function run() {
  try {
    core.info('Tryhard Action Rolling');

    const apiKey = core.getInput('apiKey') || process.env.CONTENT_API_KEY;
    const chapterApiURL = core.getInput('chapterApiURL') || process.env.CONTENT_CHAPTER_API_URL;
    const versionApiURL = core.getInput('versionApiURL') || process.env.CONTENT_VERSION_API_URL;
    const filesPath = core.getInput('contentPath') || process.env.FILES_PATH;
    const assetsFilesPath = core.getInput('assetPath') || process.env.ASSETS_PATH;

    const arrayOfAssets = await buildAssets(assetsFilesPath);

    // const arrayOfChapters = await buildChapters(filesPath);
    // // @Todo: disparar criação de capitulos via service.js
    // const chapterIds = await createChapters(arrayOfChapters, chapterApiURL, apiKey);

    // @Todo: disparar criação de versão via service.js
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
