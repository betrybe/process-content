const axios = require('axios');

const createChapters = async (url, arrayOfChapters) => {
  return Promise.all(
    arrayOfChapters.map(chapter => createOneChapter(url, chapter))
  )
}

const createOneChapter = async (apiUrl, body, config) => {
  const url = `${apiUrl}/api/content/chapter`;

  return await axios.post(url, body, config)
}

const createVersion = async (apiUrl, body, config) => {
  const url = `${apiUrl}/api/content/version/release`;

  return await axios.post(url, body, config)
}

const config = {
  headers: { "X-api-content-key": "teste_api_content_key_agora_vai_foguete_tem_re_sim-preview-staging" }
}

module.exports = {
  createChapters,
  createVersion
}