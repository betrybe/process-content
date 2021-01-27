const axios = require('axios');
const core = require('@actions/core');
const logger = require('./logger');

const CHUNK_SIZE = core.getInput('chunkSize') || process.env.CHUNK_SIZE;
const INTERVAL_BETWEEN_CHUNKS = core.getInput('intervalBetweenChunks') || process.env.INTERVAL_BETWEEN_CHUNKS;

const handleChapterError = (chapter) => {
  const filePath = JSON.parse(chapter.config.data).path;
  const errorMessage = chapter.data.message ? chapter.data.message : chapter.statusText;

  const logBody = {
    path: filePath,
    step: 'Chapter',
    statusCode: chapter.status,
    requestID: chapter.headers['x-request-id'],
    message: errorMessage,
  };

  return logger.error(logBody);
};

const handleChaptersResult = (createdChaptersResult) =>
  createdChaptersResult.reduce((resultAccumulator, currentResult) => {
    const newResultAccumulator = { ...resultAccumulator };
    if (currentResult.status === 200) {
      newResultAccumulator.results = [
        ...newResultAccumulator.results, currentResult.data.chapter_id,
      ];
      return newResultAccumulator;
    }

    if (currentResult.status !== 422) {
      handleChapterError(currentResult);
      newResultAccumulator.success = false;
      return newResultAccumulator;
    }

    return newResultAccumulator;
  }, { results: [], success: true });

const configHeaders = (apiKey) => ({ headers: { 'x-api-content-key': apiKey } });

const createChapter = (apiUrl, body, arrayOfAssets, apiKey) => {
  const headerObj = configHeaders(apiKey);
  const bodyObj = {
    path: body.path,
    markdown_commit_id: body.markdownCommitId,
    markdown_content: body.contentMd,
    yaml_commit_id: body.yamlCommitId,
    yaml_content: body.contentYaml,
    assets_map: arrayOfAssets,
  };

  return axios.post(apiUrl, bodyObj, headerObj);
};

const chunkArray = (myArray, chunkSize) => {
  const results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }

  return results;
};

const createChaptersChunk = (arrayOfChapters) => chunkArray(arrayOfChapters, CHUNK_SIZE);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createChapters = async (arrayOfChapters, arrayOfAssets, apiUrl, apiKey) => {
  const groupOfChapters = createChaptersChunk(arrayOfChapters);

  core.info(`Número de Grupos: #${groupOfChapters.length}`);

  const result = await groupOfChapters.reduce((chain, chapters, index) => (
    chain.then(async (previousResults) => {
      core.info(`Iniciando envio grupo ${(index + 1)}...`);
      const responses = await Promise.all(chapters.map((chapter) =>
        createChapter(apiUrl, chapter, arrayOfAssets, apiKey).catch((e) => e.response)));

      await sleep(INTERVAL_BETWEEN_CHUNKS);
      core.info('Envio finalizado.');

      return [...responses, ...previousResults || []];
    })
  ), Promise.resolve());

  core.info('::Todos os grupos de requests finalizados::');

  return handleChaptersResult(result);
};

const createVersion = (apiUrl, body, apiKey, mergedAt, mergeCommitId) => {
  const headerObj = configHeaders(apiKey);

  const versionBodyObj = {
    merge_commit_id: mergeCommitId,
    timestamp: mergedAt,
    chapter_ids: body,
  };

  return axios.post(apiUrl, versionBodyObj, headerObj);
};

const checkForApplication = (apiUrl, apiKey, retries = 15) => {
  const headerObj = configHeaders(apiKey);

  return axios.get(apiUrl, headerObj)
    .then((result) => {
      if (result.status === 200) return { applicationReady: true };
      return checkForApplication(apiUrl, apiKey, retries - 1);
    })
    .catch(async () => {
      await sleep(15000);
      return checkForApplication(apiUrl, apiKey, retries - 1);
    });
};

module.exports = {
  createChapters,
  createVersion,
  checkForApplication,
};
