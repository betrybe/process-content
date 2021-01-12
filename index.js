const core = require('@actions/core');
const { processContent } = require('./src/main');

async function run() {
  try {
    core.info('Tryhard Action Rolling');

    await processContent();

    core.info('A new version of chapter was created with success');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
