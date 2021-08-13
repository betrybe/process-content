import dotenv from 'dotenv';
import core from '@actions/core';
import {
  buildChapters,
  buildAssets,
} from './files';

import {
  createChapters,
  createVersion,
  checkForApplication,
} from './service';

dotenv.config();

export const processContent = async () => {
  const apiKey = core.getInput('apiKey') || process.env.CONTENT_API_KEY;
  const chapterApiURL = core.getInput('chapterApiURL') || process.env.CONTENT_CHAPTER_API_URL;
  const versionApiURL = core.getInput('versionApiURL') || process.env.CONTENT_VERSION_API_URL;
  const applicationHealthApiURL = core.getInput('applicationHealthApiURL') || process.env.APPLICATION_HEALTH_API_URL;
  const filesPath = core.getInput('contentPath') || process.env.FILES_PATH;
  const assetsFilesPath = core.getInput('assetPath') || process.env.ASSETS_PATH;
  const pullRequestMergedAt = Date.parse(core.getInput('pullRequestMergedAt')) || Date.parse(new Date().toString());
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
    merge_commit_id: pullRequestMergeCommitId ?? '',
    pull_request_merged_at: pullRequestMergedAt,
    pull_request_id: pullRequestId ?? '',
    chapter_ids: results,
  };

  return createVersion(versionApiURL, apiKey, bodyParams);
};
