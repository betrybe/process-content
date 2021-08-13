import axios, { AxiosResponse } from 'axios';
import core from '@actions/core';
import logger from './logger';
import type { AssetFileInfo, Chapter } from './files';

const CHUNK_SIZE = parseInt(core.getInput('chunkSize')) || process.env.CHUNK_SIZE;
const INTERVAL_BETWEEN_CHUNKS = parseInt(core.getInput('intervalBetweenChunks')) || process.env.INTERVAL_BETWEEN_CHUNKS;
const MAX_SERVICE_RETRY = parseInt(core.getInput('maxServiceRetry') )|| process.env.MAX_SERVICE_RETRY || 15;
const HEALTH_CHECK_INTERVAL = parseInt(core.getInput('healthCheckInterval')) || process.env.HEALTH_CHECK_INTERVAL || 10000;

type ChapterResponse = {
  data: {
    chapter_id: number;
  }
  message: string;
}

type VersionBody = {
  merge_commit_id: string;
  pull_request_merged_at: number;
  pull_request_id: string | number;
  chapter_ids: number[];
}

const handleChapterError = (chapter: AxiosResponse<ChapterResponse>) => {
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

const handleChaptersResult = (createdChaptersResult: AxiosResponse<ChapterResponse>[]) =>
  createdChaptersResult.reduce((resultAccumulator, currentResult) => {
    const newResultAccumulator = { ...resultAccumulator };
    if (currentResult.status === 200) {
      newResultAccumulator.results = [
        ...newResultAccumulator.results,
        currentResult.data.data.chapter_id,
      ];
      return newResultAccumulator;
    }

    if (currentResult.status !== 422) {
      handleChapterError(currentResult);
      newResultAccumulator.success = false;
      return newResultAccumulator;
    }

    return newResultAccumulator;
  }, { results: [] as number[], success: true });

const configHeaders = (apiKey: string) => ({ headers: { 'x-api-content-key': apiKey } });

const createChapter = (apiUrl: string, body: Chapter, arrayOfAssets: AssetFileInfo[], apiKey: string) => {
  const headerObj = configHeaders(apiKey);
  const bodyObj = {
    path: body.path,
    markdown_commit_id: body.markdownCommitId,
    markdown_content: body.contentMd,
    yaml_commit_id: body.yamlCommitId,
    yaml_content: body.contentYaml,
    assets_map: arrayOfAssets,
  };

  return axios.post<ChapterResponse>(apiUrl, bodyObj, headerObj);
};

function chunkArray<T>(myArray: Array<T>, chunkSize: number) {
  const results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }

  return results;
};

const createChaptersChunk = (arrayOfChapters: Chapter[]) => chunkArray(arrayOfChapters, CHUNK_SIZE);
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createChapters = async (arrayOfChapters: Chapter[], arrayOfAssets: AssetFileInfo[], apiUrl: string, apiKey: string) => {
  const groupOfChapters = createChaptersChunk(arrayOfChapters);

  core.info(`Número de Grupos: #${groupOfChapters.length}`);

  const result = await groupOfChapters.reduce(async (chain, chapters, index) => {
    const previousResults = await chain;

    core.info(`Iniciando envio grupo ${(index + 1)}...`);
    const chapterPromises = chapters.map((chapter) => createChapter(apiUrl, chapter, arrayOfAssets, apiKey));

    const responses: AxiosResponse<ChapterResponse>[] = await Promise.all(chapterPromises).catch((e) => e.response);

    await sleep(INTERVAL_BETWEEN_CHUNKS);
    core.info('Envio finalizado.');

    return [...responses, ...previousResults || []]; 
  }, Promise.resolve() as unknown as Promise<AxiosResponse<ChapterResponse>[]>);

  core.info('::Todos os grupos de requests finalizados::');

  return handleChaptersResult(result);
};

export const createVersion = (apiUrl: string, apiKey: string, versionBodyObj: VersionBody) => {
  const headerObj = configHeaders(apiKey);

  return axios.post(apiUrl, versionBodyObj, headerObj);
};

export const checkForApplication = (apiUrl: string, apiKey: string, retries = MAX_SERVICE_RETRY): Promise<{ applicationReady: boolean }> => {
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
