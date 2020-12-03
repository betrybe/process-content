const { exec } = require('child_process');
const files = require('./files');
const { lsFiles, rawYamlContent, rawMarkdownContent } = require('./__mocks__/files');

jest.mock('child_process');

describe('Files', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Get all repo files as an array', async () => {
    exec.mockImplementationOnce((command, callback) => callback(null, { stdout: lsFiles }));

    const expected = [
      'priv/markdown_templates/content/back-end/sql/table-management/_index.html.md',
      'priv/markdown_templates/content/back-end/sql/table-management/_index.yaml',
    ];

    const filesArray = await files.getFiles('');
    expect(typeof filesArray).toBe('object');
    expect(filesArray).toHaveLength(2);
    expect(filesArray).toEqual(expected);
  });

  test('Groups matching yaml and md files', async () => {
    const filesArray = [
      'priv/markdown_templates/content/back-end/sql/table-management/_index.html.md',
      'priv/markdown_templates/content/back-end/sql/table-management/_index.yaml',
    ];

    const groupedFiles = files.groupFiles(filesArray);

    expect(typeof groupedFiles).toBe('object');
    expect(groupedFiles).toHaveLength(1);
    expect(groupedFiles[0]).toHaveProperty('markdown', filesArray[0]);
    expect(groupedFiles[0]).toHaveProperty('yaml', filesArray[1]);
  });

  test('Gets last commit id from a given file path', async () => {
    exec.mockImplementationOnce((command, callback) => callback(null, { stdout: 'd9771871c0cadc48e3d4141f93004b9c25d7201a' }));

    const commitId = await files.getCommitId('');

    expect(typeof commitId).toBe('string');
    expect(commitId).toEqual('d9771871c0cadc48e3d4141f93004b9c25d7201a');
  });

  test('Gets blob content from a given file path and commit id', async () => {
    exec.mockImplementationOnce((command, callback) => callback(null, { stdout: rawYamlContent }));

    const commitId = await files.getRawContent('', '');

    expect(typeof commitId).toBe('string');
    expect(commitId).toEqual(rawYamlContent);
  });
});

describe('Extracts yaml and markdown file commit and blob', () => {
  beforeAll((done) => {
    exec
      .mockImplementationOnce((command, callback) => callback(null, { stdout: 'd9771871c0cadc48e3d4141f93004b9c25d7201a' }))
      .mockImplementationOnce((command, callback) => callback(null, { stdout: rawMarkdownContent }))
      .mockImplementationOnce((command, callback) => callback(null, { stdout: 'd9771871c0cadc48e3d4141f93004b9c25d7201a' }))
      .mockImplementationOnce((command, callback) => callback(null, { stdout: rawYamlContent }));

    setTimeout(done, 0);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test('Returns chapter Obj to Given', async () => {
    const chapterPaths = {
      markdown: 'priv/markdown_templates/content/back-end/sql/table-management/_index.html.md',
      yaml: 'priv/markdown_templates/content/back-end/sql/table-management/_index.yaml',
    };

    const chapterObj = await files.extractFileData(chapterPaths);

    expect(typeof chapterObj).toBe('object');
    expect(chapterObj).toHaveProperty('markdown', chapterPaths.markdown);
    expect(chapterObj).toHaveProperty('yaml', chapterPaths.yaml);
    expect(chapterObj).toHaveProperty('markdown_commit_id', 'd9771871c0cadc48e3d4141f93004b9c25d7201a');
    expect(chapterObj).toHaveProperty('content_md', rawMarkdownContent);
  });
});
