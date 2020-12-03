const core = require('@actions/core');
const {
  buildChapters
} = require('./main')

async function run() {
  try {
    core.info('Tryhard Action Rolling')

    const apiKey = core.getInput('apiKey', { required: true });
    const apiURL = core.getInput('apiUrl', { required: true });
    const filesPath = core.getInput('path', { required: true });

    const arrayOfChapters = buildChapters(path);

    
    //@Todo: disparar criação de capitulos via service.js

    //@Todo: disparar criação de versão via service.js


  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
