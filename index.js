require('dotenv').config();
const core = require('@actions/core');
const {
  buildChapters,
} = require('./files');
const {
  createChapters,
} = require('./service');

async function run() {
  try {
    core.info('Tryhard Action Rolling');

    const apiKey = core.getInput('apiKey') || process.env.API_KEY;
    const apiURL = core.getInput('apiUrl') || process.env.API_URL;
    const filesPath = core.getInput('path') || process.env.FILES_PATH;

    const arrayOfChapters = await buildChapters(filesPath);
    // @Todo: disparar criação de capitulos via service.js
    const chapterIds = await createChapters(arrayOfChapters, apiURL, apiKey);

    // @Todo: disparar criação de versão via service.js
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
