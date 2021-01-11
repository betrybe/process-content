const axios = require('axios');
const core = require('@actions/core');

const handleChapterError = (chapter) => {
  const failedChapterData = {
    contentPath: JSON.parse(chapter.config.data).path,
    status: chapter.status,
    message: chapter.statusText,
  };

  core.error('----------- Error Processing Chapter------------');
  core.error(`Content Path: ${failedChapterData.contentPath}`);
  core.error(`Status code: ${failedChapterData.status}`);
  core.error(`Error Message: ${failedChapterData.message}`);
};

const handleChaptersResult = (createdChaptersResult) => {
  const results = createdChaptersResult.reduce((resultAccumulator, currentResult) => {
    const newResultAccumulator = { ...resultAccumulator };
    if (currentResult.status === 500 || currentResult.status === 400) {
      handleChapterError(currentResult);

      newResultAccumulator.success = false;
      return newResultAccumulator;
    }

    if (currentResult.status === 200) {
      newResultAccumulator.results = [
        ...newResultAccumulator.results, currentResult.data.chapter_id,
      ];
      return newResultAccumulator;
    }

    return newResultAccumulator;
  },
  { results: [], success: true });

  return results;
};

const configHeaders = (apiKey) => ({ headers: { 'x-api-content-key': apiKey } });

const createOneChapter = (apiUrl, body, config) => axios.post(apiUrl, body, config);

const createChapters = async (arrayOfChapters, apiUrl, apiKey) => {
  const headerObj = configHeaders(apiKey);

  return Promise.all(
    arrayOfChapters.map((chapter) =>
      createOneChapter(apiUrl, chapter, headerObj).catch((e) => e.response)),
  ).then((result) => handleChaptersResult(result));
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

module.exports = {
  createChapters,
  createVersion,
};
