const fs = require('fs');
const { exec } = require('child_process');
const gitCommands = require('../src/git');
const processHelper = require('../processHelper');

const readMockFile = (path) => fs.readFileSync(path, 'utf8');

const rawMarkdownContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.html.md');

jest.mock('child_process');
jest.mock('../processHelper');

describe('Git Commands', () => {
  afterEach(() => jest.resetAllMocks());

  test('Get all repo files as an array', async () => {
    const lsFiles = 'priv/markdown_templates/content/back-end/sql/table-management/_index.html.md\npriv/markdown_templates/content/back-end/sql/table-management/_index.yaml';

    exec.mockImplementationOnce((command, callback) => callback(null, { stdout: lsFiles }));

    const files = await gitCommands.getFiles('priv/markdown_templates/content/');
    expect(typeof files).toBe('string');
    expect(files).toEqual(lsFiles);
  });

  test('Gets last commit id from a given file path', async () => {
    exec.mockImplementationOnce((command, callback) => callback(null, { stdout: 'd9771871c0cadc48e3d4141f93004b9c25d7201a' }));

    const commitId = await gitCommands.getCommitId('priv/markdown_templates/content/back-end/sql/table-management/_index.html.md');

    expect(typeof commitId).toBe('string');
    expect(commitId).toEqual('d9771871c0cadc48e3d4141f93004b9c25d7201a');
  });

  test('Gets blob content from a given file path and commit id', async () => {
    processHelper.spawnProcess.mockReturnValueOnce({ stdout: rawMarkdownContent, stderr: null });

    const blobContent = await gitCommands.getBlobContent('d9771871c0cadc48e3d4141f93004b9c25d7201a', 'priv/markdown_templates/content/back-end/sql/_index.html.md');

    expect(typeof blobContent).toBe('string');
    expect(blobContent).toEqual(rawMarkdownContent);
  });
});
