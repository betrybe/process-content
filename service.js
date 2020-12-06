const axios = require('axios');

const configHeaders = (apiKey) => ({ headers: { 'X-api-content-key': apiKey } });

const createOneChapter = (apiUrl, body, config) => {
  const url = `${apiUrl}/api/content/chapter`;

  return axios.post(url, body, config);
};

const createChapters = async (arrayOfChapters, apiUrl, apiKey) => {
  const headerObj = configHeaders(apiKey);

  return Promise.all(
    arrayOfChapters.map((chapter) => createOneChapter(apiUrl, chapter, headerObj)),
  );
};

const createVersion = async (apiUrl, body, config) => {
  const url = `${apiUrl}/api/content/version/release`;

  return axios.post(url, body, config);
};

module.exports = {
  createChapters,
  createVersion,
};
