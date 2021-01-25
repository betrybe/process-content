const core = require('@actions/core');
const { processContent } = require('./src/main');

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
};

async function run() {
  try {
    core.info('Tryhard Action Rolling');

    const start = Date.parse(new Date());

    await processContent();

    const finish = Date.parse(new Date());

    core.info(`Total: ${millisToMinutesAndSeconds(finish - start)}`);

    core.info('A new version of chapter was created with success');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
