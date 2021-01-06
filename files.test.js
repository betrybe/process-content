const fs = require('fs');
const files = require('./files');
const gitCommands = require('./git');
const s3 = require('./s3');

jest.mock('./git');
jest.mock('./s3');

const readMockFile = (path) => fs.readFileSync(path, 'utf8');

describe('Files', () => {
  afterEach(() => jest.resetAllMocks());

  const rawMarkdownContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.html.md');
  const rawYamlContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.yaml');

  test('Groups matching yaml and md files', async () => {
    const filesArray = [
      'priv/markdown_templates/content/back-end/sql/table-management/_index.html.md',
      'priv/markdown_templates/content/back-end/sql/table-management/_index.yaml',
    ];

    const groupedFiles = files.groupFiles(filesArray);

    expect(typeof groupedFiles).toBe('object');
    expect(groupedFiles).toHaveLength(1);
    expect(groupedFiles[0]).toHaveProperty('markdownPath', filesArray[0]);
    expect(groupedFiles[0]).toHaveProperty('yamlPath', filesArray[1]);
  });

  test('Extracts File Blob and Content to a given Path ', async () => {
    gitCommands.getCommitId.mockResolvedValue('d9771871c0cadc48e3d4141f93004b9c25d7201a');
    gitCommands.getBlobContent.mockResolvedValue(rawMarkdownContent);

    const fileInfo = await files.extractFileInfo('/priv/markdown_templates/content/back-end/sql/_index.html.md');

    expect(typeof fileInfo).toBe('object');
    expect(gitCommands.getCommitId).toHaveBeenCalledTimes(1);
    expect(gitCommands.getBlobContent).toHaveBeenCalledTimes(1);
    expect(fileInfo).toHaveProperty('markdownCommitId', 'd9771871c0cadc48e3d4141f93004b9c25d7201a');
    expect(fileInfo).toHaveProperty('contentMd', rawMarkdownContent);
  });

  test('Builds chapter obj to given markdown and yaml path', async () => {
    gitCommands.getCommitId.mockResolvedValue('d9771871c0cadc48e3d4141f93004b9c25d7201a');
    gitCommands.getBlobContent
      .mockResolvedValueOnce(rawMarkdownContent)
      .mockResolvedValueOnce(rawYamlContent);

    const filesPathObj = {
      markdownPath: 'priv/markdown_templates/content/back-end/sql/table-management/_index.html.md',
      yamlPath: 'priv/markdown_templates/content/back-end/sql/table-management/_index.yaml',
    };

    const chapterObj = await files.buildChapterObj(filesPathObj);

    expect(typeof chapterObj).toBe('object');
    expect(gitCommands.getCommitId).toHaveBeenCalledTimes(2);
    expect(gitCommands.getBlobContent).toHaveBeenCalledTimes(2);

    expect(chapterObj).toHaveProperty('path', filesPathObj.markdownPath);
    expect(chapterObj).toHaveProperty('markdownCommitId', 'd9771871c0cadc48e3d4141f93004b9c25d7201a');
    expect(chapterObj).toHaveProperty('yamlCommitId', 'd9771871c0cadc48e3d4141f93004b9c25d7201a');
    expect(chapterObj).toHaveProperty('contentMd', rawMarkdownContent);
    expect(chapterObj).toHaveProperty('contentYaml', rawYamlContent);
  });

  test('Generates md5 hash of asset blob', () => {
    const assetPath = '__mocks__/fixtures/assets/static/agile/scrum.png';
    const assetBlob = readMockFile(assetPath);

    gitCommands.getBlobContent
      .mockResolvedValueOnce(assetBlob);

    const blobMd5 = files.generateHashOfAssetBlob(assetBlob);

    expect(typeof blobMd5).toBe('string');
    expect(blobMd5).toEqual('c0c1cebaf505a08a0c63d2437ad338c7');
  });

  test('Builds a new asset path URL', () => {
    const assetPath = '__mocks__/fixtures/assets/static/agile/scrum.png';

    const newHashUrl = files.buildAssetHashUrl(assetPath, 'c0c1cebaf505a08a0c63d2437ad338c7');

    expect(typeof newHashUrl).toBe('string');
    expect(newHashUrl).toEqual('__mocks__/fixtures/assets/static/agile/scrum-c0c1cebaf505a08a0c63d2437ad338c7.png');
  });

  test('Builds array of assets new hash urls', async () => {
    const assetPath = '__mocks__/fixtures/assets/static/agile/scrum.png';
    const assetBlob = readMockFile(assetPath);

    gitCommands.getBlobContent
      .mockResolvedValueOnce(assetBlob);

    s3.uploadToBucket
      .mockResolvedValueOnce({ ETag: 'bebda3f165aede5d08136413d13dca70' });

    const urlHashObj = await files.processAssetContent(assetPath);

    expect(typeof urlHashObj).toBe('object');
    expect(urlHashObj).toEqual({
      [assetPath]: '__mocks__/fixtures/assets/static/agile/scrum-213c790c4129428a74486324d08e78e7.png',
    });
  });
});
