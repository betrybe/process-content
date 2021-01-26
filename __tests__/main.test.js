const fs = require('fs');
const files = require('../src/files');
const service = require('../src/service');
const main = require('../src/main');

jest.mock('../src/files');
jest.mock('../src/service');

const readMockFile = (path) => fs.readFileSync(path, 'utf8');

describe('Action Execution', () => {
  afterEach(() => jest.resetAllMocks());

  test('throw error when heroku isn`t available yet', async () => {
    const rawMarkdownContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/joining_tables/_index.html.md');
    const rawYamlContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/joining_tables/_index.yaml');

    service.checkForHeroku.mockReturnValue({ herokuReady: false });

    files.buildChapters.mockReturnValueOnce(
      [
        {
          path: '__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/joining_tables/_index.html.md',
          markdownCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          contentMd: rawMarkdownContent,
          yamlCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          contentYaml: rawYamlContent,
        },
        {
          path: '__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.html.md',
          markdownCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          yamlCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
        },
      ],
    );

    service.createChapters.mockReturnValue(
      {
        success: false,
        results: [{
          data: {
            message: 'Parâmetros incorretos. (path, markdownCommitId, contentMd, yamlCommitId, contentYaml) são obrigatórios',
          },
          status: 400,
        }],
      },
    );

    await expect(main.processContent()).rejects.toThrow('Heroku deployment isn`t available');
  });

  test('throw error when a chapter couldn`t be created', async () => {
    const rawMarkdownContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/joining_tables/_index.html.md');
    const rawYamlContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/joining_tables/_index.yaml');

    service.checkForHeroku.mockReturnValue({ herokuReady: true });

    files.buildChapters.mockReturnValueOnce(
      [
        {
          path: '__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/joining_tables/_index.html.md',
          markdownCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          contentMd: rawMarkdownContent,
          yamlCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          contentYaml: rawYamlContent,
        },
        {
          path: '__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.html.md',
          markdownCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          yamlCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
        },
      ],
    );

    service.createChapters.mockReturnValue(
      {
        success: false,
        results: [{
          data: {
            message: 'Parâmetros incorretos. (path, markdownCommitId, contentMd, yamlCommitId, contentYaml) são obrigatórios',
          },
          status: 400,
        }],
      },
    );

    await expect(main.processContent()).rejects.toThrow(' New Version Couldn`t be created due to error when creating a chapter');
  });

  test('successfully creates version', async () => {
    const rawMarkdownContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/joining_tables/_index.html.md');
    const rawYamlContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/joining_tables/_index.yaml');

    const rawMarkdownContent2 = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.html.md');
    const rawYamlContent2 = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.yaml');

    service.checkForHeroku.mockReturnValue({ herokuReady: true });

    files.buildChapters.mockReturnValueOnce(
      [
        {
          path: '__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/joining_tables/_index.html.md',
          markdownCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          contentMd: rawMarkdownContent,
          yamlCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          contentYaml: rawYamlContent,
        },
        {
          path: '__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.html.md',
          markdownCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          contentMd: rawMarkdownContent2,
          yamlCommitId: '7044d626ad61a8011a0ee8ad78e16c89f3c781f7',
          contentYaml: rawYamlContent2,
        },
      ],
    );

    service.createChapters.mockReturnValue(
      {
        success: true,
        results: [
          {
            data: {
              chapter_id: 'c54f3049-965a-4634-ae16-6e4251ef7e3e',
            },
            status: 200,
          },
          {
            data: {
              chapter_id: '94849e6f-0075-4970-a06a-ed821708490a',
            },
            status: 200,
          },
        ],
      },
    );

    service.createVersion.mockReturnValue({
      data: '',
      status: 201,
    });

    await expect(main.processContent()).resolves.toEqual({ data: '', status: 201 });
  });
});
