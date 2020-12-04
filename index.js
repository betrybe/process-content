const core = require('@actions/core');
const {
  buildChapters,
} = require('./files');

async function run() {
  try {
    core.info('Tryhard Action Rolling');

    const apiKey = core.getInput('apiKey') || 'teste_api_content_key_agora_vai_foguete_tem_re_sim-preview-staging';
    const apiURL = core.getInput('apiUrl') || 'https://staging.course.betrybe.com/';
    const filesPath = core.getInput('path') || 'priv/markdown_templates/content';

    const arrayOfChapters = await buildChapters(filesPath);
    
    // @Todo: disparar criação de capitulos via service.js

    // @Todo: disparar criação de versão via service.js
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
