/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 407:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { spawn } = __nccwpck_require__(129);

const spawnProcess = (...args) => {
  const process = spawn(...args);
  const processOutput = {
    stdout: '',
    stderr: '',
  };

  return new Promise((resolve, reject) => {
    if (process.stdout) {
      process.stdout.on('data', (data) => {
        processOutput.stdout += data;
      });
    }

    if (process.stderr) {
      process.stderr.on('data', (data) => {
        processOutput.stderr += data;
      });
    }

    process.on('error', reject);
    process.on('close', (code) => {
      if (code === 0) return resolve(processOutput);
      return reject(processOutput);
    });
  });
};

module.exports = {
  spawnProcess,
};


/***/ }),

/***/ 667:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(105);
const crypto = __nccwpck_require__(417);
const path = __nccwpck_require__(622);
const gitCommands = __nccwpck_require__(940);
const s3 = __nccwpck_require__(139);
const utils = __nccwpck_require__(743);

const extractFileInfo = async (filePath) => {
  const commitId = await gitCommands.getCommitId(filePath);
  const blobContent = await gitCommands.getBlobContent(commitId, filePath);

  if (path.extname(filePath) === '.md') {
    return {
      markdownCommitId: commitId,
      contentMd: blobContent,
    };
  } if (path.extname(filePath) === '.yaml') {
    return {
      yamlCommitId: commitId,
      contentYaml: blobContent,
    };
  }

  return { assetContent: blobContent };
};

const buildChapterObj = async (chapterObj) => {
  const { markdownPath, yamlPath } = chapterObj;

  const markdownObj = await extractFileInfo(markdownPath);
  const markdownYaml = await extractFileInfo(yamlPath);

  return {
    path: markdownPath,
    ...markdownObj,
    ...markdownYaml,
  };
};

const groupFiles = (filesArr) => filesArr.reduce((groupedFiles, currentPath, index, array) => {
  if (index === array.length) return groupedFiles;

  if (path.extname(currentPath).includes('.yaml')) return groupedFiles;

  const filesMatch = utils.verifyFileMatching(currentPath, array[index + 1]);

  if (filesMatch) {
    const markdownPath = currentPath;
    const yamlPath = array[index + 1];

    return [...groupedFiles, { markdownPath, yamlPath }];
  }

  return groupedFiles;
}, []);

const buildChapters = async (chapterPath) => {
  const arrayOfFiles = await gitCommands.getFiles(chapterPath);

  const sanitizedArrayOfFiles = utils.sanitizeFilesArray(arrayOfFiles);

  const chapterArrayOfObj = groupFiles(sanitizedArrayOfFiles);

  core.info(`Processing ${chapterArrayOfObj.length} Chapters`);
  return Promise.all(
    chapterArrayOfObj.map((chapterObj) => buildChapterObj(chapterObj)),
  );
};

const buildAssetHashUrl = (assetPath, blobHash) => {
  const extension = path.extname(assetPath);
  const pathSuffix = assetPath.substring(0, assetPath.lastIndexOf('.')).split('static/').pop();
  const newHashUrl = `${pathSuffix}-${blobHash}${extension}`;

  return newHashUrl;
};

const generateContentMd5Hash = (fileContent) => {
  const contentMd5 = crypto.createHash('md5').update(fileContent).digest('hex');
  return contentMd5;
};

const getAssetsFiles = async (assetsPath) => {
  const arrayOfAssets = await gitCommands.getFiles(assetsPath);

  const sanitizedArrayOfAssets = utils.sanitizeFilesArray(arrayOfAssets);

  return sanitizedArrayOfAssets;
};

const processAssetContent = async (assetPath) => {
  const { assetContent } = await extractFileInfo(assetPath);

  const assetContentMd5 = generateContentMd5Hash(assetPath, assetContent);
  const assetUrlHash = buildAssetHashUrl(assetPath, assetContentMd5);

  const location = await s3.uploadToBucket(assetUrlHash, assetPath);
  const s3UrlLocation = utils.urlSanitizer(location);
  const relativeAssetPath = assetPath.split('static').pop();
  core.info(`Asset: ${s3UrlLocation} sucessfully uploaded`);
  return { [relativeAssetPath]: s3UrlLocation };
};

const buildAssets = async (assetsPath) => {
  const arrayOfAssets = await getAssetsFiles(assetsPath);

  core.info(`Processing ${arrayOfAssets.length} Assets`);
  return Promise.all(
    arrayOfAssets.map((assetPath) => processAssetContent(assetPath)),
  );
};

module.exports = {
  buildChapters,
  groupFiles,
  buildChapterObj,
  extractFileInfo,
  buildAssets,
  generateContentMd5Hash,
  buildAssetHashUrl,
  processAssetContent,
};


/***/ }),

/***/ 940:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { exec } = __nccwpck_require__(129);
const util = __nccwpck_require__(669);
const logger = __nccwpck_require__(465);
const { spawnProcess } = __nccwpck_require__(407);

const bashExec = util.promisify(exec);

const getFiles = async (path) => {
  const { stdout, stderr } = await bashExec(`git ls-files ${path} ':!:${path}/basket-of-unused-content*'`);

  if (stderr) return logger.info({ message: `Error at getFiles because: ${stderr}` });

  return stdout;
};

const getCommitId = async (path) => {
  const { stdout, stderr } = await bashExec(`git log -n 1 --pretty=format:%H -- ${path}`);

  if (stderr) return logger.info({ message: `Error at getCommitIds because: ${stderr}` });

  return stdout;
};

const getBlobContent = async (commitId, path) => {
  const { stdout, stderr } = await spawnProcess('git', ['cat-file', '-p', `${commitId}:${path}`]);

  if (stderr) return logger.info({ message: `Error at getRawContent because: ${stderr}` });

  return stdout;
};

module.exports = {
  getFiles,
  getCommitId,
  getBlobContent,
  spawnProcess,
};


/***/ }),

/***/ 465:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(105);

const loggerDisplay = (params, display) => {
  const logEntries = Object.entries(params);

  return logEntries.forEach((entrie) => {
    display(`${entrie[0]}: ${entrie[1]}`);
  });
};

const Logger = {
  error: (args) => { loggerDisplay(args, core.error); },
  setFailed: (args) => { loggerDisplay(args, core.setFailed); },
  info: (args) => { loggerDisplay(args, core.info); },
};

module.exports = Logger;


/***/ }),

/***/ 849:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

__nccwpck_require__(341).config();
const core = __nccwpck_require__(105);
const {
  buildChapters,
  buildAssets,
} = __nccwpck_require__(667);
const {
  createChapters,
  createVersion,
  checkForApplication,
} = __nccwpck_require__(152);

const processContent = async () => {
  const apiKey = core.getInput('apiKey') || process.env.CONTENT_API_KEY;
  const chapterApiURL = core.getInput('chapterApiURL') || process.env.CONTENT_CHAPTER_API_URL;
  const versionApiURL = core.getInput('versionApiURL') || process.env.CONTENT_VERSION_API_URL;
  const applicationHealthApiURL = core.getInput('applicationHealthApiURL') || process.env.APPLICATION_HEALTH_API_URL;
  const filesPath = core.getInput('contentPath') || process.env.FILES_PATH;
  const assetsFilesPath = core.getInput('assetPath') || process.env.ASSETS_PATH;
  const pullRequestMergedAt = Date.parse(core.getInput('pullRequestMergedAt')) || Date.parse(new Date());
  const pullRequestMergeCommitId = core.getInput('pullRequestMergeCommitId') || process.env.COMMIT_ID;
  const pullRequestId = core.getInput('pullRequestId') || process.env.PULL_REQUEST_ID;

  const arrayOfAssets = await buildAssets(assetsFilesPath);

  core.info(`::Check ${applicationHealthApiURL}::`);
  const { applicationReady } = await checkForApplication(applicationHealthApiURL, apiKey);

  if (!applicationReady) {
    throw new Error(`Aplicação ${applicationHealthApiURL} ainda não está disponível. Execute novamente esta action e assim que o servidor estiver pronto ela fará o processo normalmente.`);
  }

  const arrayOfChapters = await buildChapters(filesPath);
  const {
    results,
    success,
  } = await createChapters(arrayOfChapters, arrayOfAssets, chapterApiURL, apiKey);

  if (!success) {
    throw new Error('A New Version Couldn`t be created due to error when creating a chapter');
  }

  const bodyParams = {
    merge_commit_id: pullRequestMergeCommitId,
    pull_request_merged_at: pullRequestMergedAt,
    pull_request_id: pullRequestId,
    chapter_ids: results,
  };

  return createVersion(versionApiURL, apiKey, bodyParams);
};

module.exports = {
  processContent,
};


/***/ }),

/***/ 139:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(105);
const AWS = __nccwpck_require__(965);
const fs = __nccwpck_require__(747);
const mime = __nccwpck_require__(917);
const logger = __nccwpck_require__(465);

const credentials = {
  accessKeyId: core.getInput('awsAccessKey') || process.env.AWS_ACCESS_KEY,
  secretAccessKey: core.getInput('awsSecret') || process.env.AWS_SECRET,
};

const imageUpload = (assetUrlHash, assetBlob, assetType) => {
  const s3BucketClient = new AWS.S3(credentials);

  const params = {
    Bucket: core.getInput('bucketName') || process.env.BUCKET_NAME,
    Key: assetUrlHash,
    Body: assetBlob,
    ContentType: assetType,
  };

  return s3BucketClient.upload(params, {}).promise();
};

const uploadToBucket = async (assetUrlHash, assetPath) => {
  try {
    const assetBlob = fs.readFileSync(assetPath);
    const assetType = mime.getType(assetPath);

    const { Location } = await imageUpload(assetUrlHash, assetBlob, assetType);

    return Location;
  } catch (error) {
    const logBody = {
      path: assetPath,
      step: 'Asset',
      statusCode: 500,
      message: error.message,
    };
    return logger.setFailed(logBody);
  }
};

module.exports = {
  uploadToBucket,
  imageUpload,
};


/***/ }),

/***/ 152:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const axios = __nccwpck_require__(512);
const core = __nccwpck_require__(105);
const logger = __nccwpck_require__(465);

const CHUNK_SIZE = core.getInput('chunkSize') || process.env.CHUNK_SIZE;
const INTERVAL_BETWEEN_CHUNKS = core.getInput('intervalBetweenChunks') || process.env.INTERVAL_BETWEEN_CHUNKS;
const MAX_SERVICE_RETRY = core.getInput('maxServiceRetry') || process.env.MAX_SERVICE_RETRY || 15;
const HEALTH_CHECK_INTERVAL = core.getInput('healthCheckInterval') || process.env.HEALTH_CHECK_INTERVAL || 10000;

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

const handleChaptersResult = (createdChaptersResult) => {
  core.info(`Raw data: START ${createdChaptersResult} END `);
  createdChaptersResult.reduce((resultAccumulator, currentResult) => {
    const newResultAccumulator = { ...resultAccumulator };
    core.info(`currentResult: START ${currentResult} END `);
    if (currentResult.status === 200) {
      newResultAccumulator.results = [
        ...newResultAccumulator.results, currentResult.data.data.chapter_id,
      ];
      return newResultAccumulator;
    }

    if (currentResult.status !== 422) {
      handleChapterError(currentResult);
      newResultAccumulator.success = false;
      return newResultAccumulator;
    }

    return newResultAccumulator;
  }, { results: [], success: true })};

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

const createVersion = (apiUrl, apiKey, versionBodyObj) => {
  const headerObj = configHeaders(apiKey);

  return axios.post(apiUrl, versionBodyObj, headerObj);
};

const checkForApplication = (apiUrl, apiKey, retries = MAX_SERVICE_RETRY) => {
  const headerObj = configHeaders(apiKey);

  if (retries === 0) return Promise.resolve({ applicationReady: false });

  return axios.get(apiUrl, headerObj)
    .then((result) => {
      if (result.status === 200) return { applicationReady: true };
      core.info(`status = ${result.status}:: retrying(${retries})... ${apiUrl}`);
      return checkForApplication(apiUrl, apiKey, retries - 1);
    })
    .catch(async (response) => {
      await sleep(HEALTH_CHECK_INTERVAL);
      core.info(response);
      core.info(`retrying(${retries})... ${apiUrl}`);
      return checkForApplication(apiUrl, apiKey, retries - 1);
    });
};

module.exports = {
  createChapters,
  createVersion,
  checkForApplication,
};


/***/ }),

/***/ 743:
/***/ ((module) => {

const sanitizeExtension = (file) => file.replace(/\.[^/.]+$/, '');

const getExtension = (file) => file.split('.').pop();

const verifyFileMatching = (file1, file2) =>
  sanitizeExtension(file1).includes(sanitizeExtension(file2))
    && getExtension(file1) !== getExtension(file2);

const sanitizeFilesArray = (fileArray) =>
  fileArray.split('\n').filter((file) => getExtension(file) !== 'eex' && file !== '' && getExtension(file) !== 'mp4');

const isFigure = (extension) => (/\.(gif|jpe?g|tiff?|png|webp|svg)$/i).test(extension);

const urlSanitizer = (url) => {
  if (isFigure(url)) return url.replace('https://', 'https:\\/\\/');
  return url;
};

module.exports = {
  sanitizeExtension,
  verifyFileMatching,
  sanitizeFilesArray,
  urlSanitizer,
};


/***/ }),

/***/ 105:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 965:
/***/ ((module) => {

module.exports = eval("require")("aws-sdk");


/***/ }),

/***/ 512:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ }),

/***/ 341:
/***/ ((module) => {

module.exports = eval("require")("dotenv");


/***/ }),

/***/ 917:
/***/ ((module) => {

module.exports = eval("require")("mime");


/***/ }),

/***/ 129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 669:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(105);
const { processContent } = __nccwpck_require__(849);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;