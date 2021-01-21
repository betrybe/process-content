const axios = require('axios');
const logger = require('./logger');

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

const createChapters = async (arrayOfChapters, arrayOfAssets, apiUrl, apiKey) => Promise.all(
  arrayOfChapters.map((chapter) =>
    createChapter(apiUrl, chapter, arrayOfAssets, apiKey).catch((e) => e.response)),
).then((result) => handleChaptersResult(result));

const createVersion = (apiUrl, body, apiKey, mergedAt, mergeCommitId) => {
  const headerObj = configHeaders(apiKey);

  const versionBodyObj = {
    merge_commit_id: mergeCommitId,
    timestamp: mergedAt,
    chapter_ids: body,
  };

  return axios.post(apiUrl, versionBodyObj, headerObj);
};

module.exports = {
  createChapters,
  createVersion,
};
