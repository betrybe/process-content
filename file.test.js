
const bashExec = jest.fn();
const files = require('./files');
const { lsFiles, rawContent } = require('./__mocks__/files');
const child_process = require('child_process');

jest.mock("child_process");

describe('Files', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Get all repo files as an array', async () => {
    child_process.exec.mockImplementation((command, callback) => callback(null, {stdout: lsFiles}))

    const expected = [
      "priv/markdown_templates/content/back-end/sql/table-management/_index.html.md",
      "priv/markdown_templates/content/back-end/sql/table-management/_index.yaml"
    ];

    const filesArray = await files.getFiles('')
    expect(typeof filesArray).toBe('object');
    expect(filesArray).toHaveLength(2);
    expect(filesArray).toEqual(expected)
  })

  test('Groups matching yaml and md files', async () => {
    const filesArray = [
      "priv/markdown_templates/content/back-end/sql/table-management/_index.html.md",
      "priv/markdown_templates/content/back-end/sql/table-management/_index.yaml"
    ];    

    const groupedFiles = files.groupFiles(filesArray);

    expect(typeof groupedFiles).toBe('object');
    expect(groupedFiles).toHaveLength(1)
    expect(groupedFiles[0]).toHaveProperty("markdown", "priv/markdown_templates/content/back-end/sql/table-management/_index.html.md")
    expect(groupedFiles[0]).toHaveProperty("yaml", "priv/markdown_templates/content/back-end/sql/table-management/_index.yaml")
  });

  test('Gets last commit id from a given file path', async () => {
    child_process.exec.mockImplementation((command, callback) => callback(null, {stdout: "d9771871c0cadc48e3d4141f93004b9c25d7201a"}))

    const commitId = await files.getCommitId('');

    expect(typeof commitId).toBe('string');
    expect(commitId).toEqual('d9771871c0cadc48e3d4141f93004b9c25d7201a')
  });


  test('Gets blob content from a given commit id and file path', async() => {
    child_process.exec.mockImplementation((command, callback) => callback(null, {stdout: rawContent}))

    const rawContent = await files.getRawContent('','');

    expect(typeof rawContent).toBe('string');
    expect(rawContent).toEqual(rawContent);
  });

});


