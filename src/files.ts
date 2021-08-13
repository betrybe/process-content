import crypto from 'crypto';
import path from 'path';

import * as core from '@actions/core'
import * as gitCommands from './git';
import * as s3 from './s3';
import * as utils from './utils';

type MarkdownExtension = '*.md';
type YamlExtension = '*.yaml';

type ChapterFilePaths = {
  markdownPath: string;
  yamlPath: string;
}

export type Chapter = {
  path: string
} & MarkdownFileInfo & YamlFileInfo;

export type MarkdownFileInfo = {
  markdownCommitId: string;
  contentMd: string | void;
}

export type YamlFileInfo = {
  yamlCommitId: string;
  contentYaml: string | void;
};

export type AssetFileInfo = {
  assetContent?: string;
}

function isMarkdownExtension(extension: string): extension is MarkdownExtension {
  return extension === '.md';
}

function isYamlExtension(extension: string): extension is YamlExtension {
  return extension === '.yaml';
}


export async function extractFileInfo(filePath: MarkdownExtension): Promise<MarkdownFileInfo>;
export async function extractFileInfo(filePath: YamlExtension): Promise<YamlFileInfo>;
export async function extractFileInfo(filePath: string): Promise<AssetFileInfo>;
export async function extractFileInfo(filePath: MarkdownExtension | YamlExtension | string) {
  const commitId = await gitCommands.getCommitId(filePath) ?? '';
  const blobContent = await gitCommands.getBlobContent(commitId, filePath);

  if (isMarkdownExtension(path.extname(filePath))) {
    return {
      markdownCommitId: commitId,
      contentMd: blobContent,
    } as MarkdownFileInfo;
  } if (isYamlExtension(path.extname(filePath))) {
    return {
      yamlCommitId: commitId,
      contentYaml: blobContent,
    } as YamlFileInfo;
  }

  return { assetContent: blobContent } as AssetFileInfo;
};

export const buildChapterObj = async (chapterObj: ChapterFilePaths) => {
  const markdownPath = chapterObj.markdownPath as MarkdownExtension;
  const yamlPath = chapterObj.yamlPath as YamlExtension;

  const markdownObj = await extractFileInfo(markdownPath);
  const markdownYaml = await extractFileInfo(yamlPath);

  return {
    path: markdownPath,
    ...markdownObj,
    ...markdownYaml,
  } as Chapter;
};

export const groupFiles = (filesArr: string[]) => filesArr.reduce((groupedFiles, currentPath, index, array) => {
  if (index === array.length) return groupedFiles;

  if (path.extname(currentPath).includes('.yaml')) return groupedFiles;

  const filesMatch = utils.verifyFileMatching(currentPath, array[index + 1] ?? '');

  if (filesMatch) {
    const markdownPath = currentPath;
    const yamlPath = array[index + 1] ?? '';

    return [...groupedFiles, { markdownPath, yamlPath }];
  }

  return groupedFiles;
}, [] as ChapterFilePaths[]);

export const buildChapters = async (chapterPath: string) => {
  const arrayOfFiles = await gitCommands.getFiles(chapterPath) ?? '';

  const sanitizedArrayOfFiles = utils.sanitizeFilesArray(arrayOfFiles);

  const chapterArrayOfObj = groupFiles(sanitizedArrayOfFiles);

  core.info(`Processing ${chapterArrayOfObj.length} Chapters`);
  return Promise.all(
    chapterArrayOfObj.map((chapterObj: ChapterFilePaths) => buildChapterObj(chapterObj)),
  );
};

export const buildAssetHashUrl = (assetPath: string, blobHash: string) => {
  const extension = path.extname(assetPath);
  const pathSuffix = assetPath.substring(0, assetPath.lastIndexOf('.')).split('static/').pop();
  const newHashUrl = `${pathSuffix}-${blobHash}${extension}`;

  return newHashUrl;
};

export const generateContentMd5Hash = (fileContent: string) => crypto.createHash('md5').update(fileContent).digest('hex');

export const getAssetsFiles = async (assetsPath: string) => {
  const arrayOfAssets = await gitCommands.getFiles(assetsPath) ?? '';

  const sanitizedArrayOfAssets = utils.sanitizeFilesArray(arrayOfAssets);

  return sanitizedArrayOfAssets;
};

export const processAssetContent = async (assetPath: string) => {
  const { assetContent } = await extractFileInfo(assetPath);

  const assetContentMd5 = generateContentMd5Hash(assetContent ?? '');
  const assetUrlHash = buildAssetHashUrl(assetPath, assetContentMd5);

  const location = await s3.uploadToBucket(assetUrlHash, assetPath);
  const s3UrlLocation = utils.urlSanitizer(location);
  const relativeAssetPath = assetPath.split('static').pop() ?? '';
  core.info(`Asset: ${s3UrlLocation} sucessfully uploaded`);
  return { [relativeAssetPath]: s3UrlLocation };
};

export const buildAssets = async (assetsPath: string) => {
  const arrayOfAssets = await getAssetsFiles(assetsPath);

  core.info(`Processing ${arrayOfAssets.length} Assets`);
  return Promise.all(
    arrayOfAssets.map((assetPath) => processAssetContent(assetPath)),
  );
};