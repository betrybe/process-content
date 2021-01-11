const axios = require('axios');

const configHeaders = (apiKey) => ({ headers: { 'X-api-content-key': apiKey } });

const createOneChapter = (apiUrl, body, config) => axios.post(apiUrl, body, config);

const createChapters = async (arrayOfChapters, apiUrl, apiKey) => {
  const headerObj = configHeaders(apiKey);

  return Promise.all(
    arrayOfChapters.map((chapter) => createOneChapter(apiUrl, chapter, headerObj)),
  );
};

const createVersion = async (apiUrl, body, config) => axios.post(apiUrl, body, config);

module.exports = {
  createChapters,
  createVersion,
};
