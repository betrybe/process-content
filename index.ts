import core from '@actions/core';
import { processContent } from './src/main';

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
};

async function run() {
  try {
    core.info('Tryhard Action Rolling');

    const start = Date.parse(new Date().toString());

    await processContent();

    const finish = Date.parse(new Date().toString());

    core.info(`Total: ${millisToMinutesAndSeconds(finish - start)}`);

    core.info('A new version of chapter was created with success');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
