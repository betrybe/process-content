const files = require('./files');
const gitCommands = require('./git');
const { rawYamlContent, rawMarkdownContent } = require('./__mocks__/files');

jest.mock('./git');

describe('Files', () => {
  afterEach(() => jest.resetAllMocks());

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

    const fileInfo = await files.extractFileInfo('priv/markdown_templates/content/back-end/sql/table-management/_index.html.md');

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
});
