const core = require('@actions/core');
const {
  buildChapters
} = require('./main')

async function run() {
  try {
    core.info('Tryhard Action Rolling')

    const path = core.getInput('storagePath', { required: true });

    const arrayOfChapters =  buildChapters(path)


  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
