const { exec } = require('child_process');
const gitCommands = require('./git');
const { lsFiles, rawMarkdownContent } = require('./__mocks__/files');

jest.mock('child_process');

describe('Git Commands', () => {
  afterEach(() => jest.resetAllMocks());

  test('Get all repo files as an array', async () => {
    exec.mockImplementationOnce((command, callback) => callback(null, { stdout: lsFiles }));

    const expected = 'priv/markdown_templates/content/back-end/sql/table-management/_index.html.md\npriv/markdown_templates/content/back-end/sql/table-management/_index.yaml';

    const files = await gitCommands.getFiles('priv/markdown_templates/content/');
    expect(typeof files).toBe('string');
    expect(files).toEqual(expected);
  });

  test('Gets last commit id from a given file path', async () => {
    exec.mockImplementationOnce((command, callback) => callback(null, { stdout: 'd9771871c0cadc48e3d4141f93004b9c25d7201a' }));

    const commitId = await gitCommands.getCommitId('priv/markdown_templates/content/back-end/sql/table-management/_index.html.md');

    expect(typeof commitId).toBe('string');
    expect(commitId).toEqual('d9771871c0cadc48e3d4141f93004b9c25d7201a');
  });

  test('Gets blob content from a given file path and commit id', async () => {
    exec.mockImplementationOnce((command, callback) =>
      callback(null, { stdout: rawMarkdownContent }));

    const commitId = await gitCommands.getBlobContent('', '');

    expect(typeof commitId).toBe('string');
    expect(commitId).toEqual(rawMarkdownContent);
  });
});
