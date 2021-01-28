require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const service = require('../src/service');

jest.mock('axios');

const readMockFile = (path) => fs.readFileSync(path, 'utf8');

describe('Create Chapters', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const chapterApiURL = process.env.CONTENT_CHAPTER_API_URL;
  const apiKEY = process.env.API_KEY;

  test('creates one chapter sucessfully', async () => {
    const rawMarkdownContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.html.md');
    const rawYamlContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.yaml');

    const returnData = {
      data: {
        data: {
          chapter_id: 'fb61c068-609e-447d-92ba-b083bc2dcd20',
        },
      },
      status: 200,
    };

    const chapterBody = {
      path: 'priv/markdown_templates/content/back-end/sql/table-management/_index.html.md',
      markdownCommitId: 'd9771871c0cadc48e3d4141f93004b9c25d7201a',
      contentMd: rawMarkdownContent,
      yamlCommitId: 'd9771871c0cadc48e3d4141f93004b9c25d7201a',
      contentYaml: rawYamlContent,
    };

    axios.post.mockReturnValue(Promise.resolve(returnData));
    await expect(service.createVersion(chapterApiURL, chapterBody, apiKEY))
      .resolves.toEqual(returnData);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('non hard-skills chapter couldn`t be created ', async () => {
    const rawMarkdownContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/soft-skills/creativity/_index.html.md');
    const rawYamlContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/soft-skills/creativity/_index.html.md');

    const returnData = {
      data: { message: 'Este conteúdo não é hard-skill e não foi salvo' },
      status: 422,
    };

    const chapterBody = {
      path: '__mocks__/fixtures/priv/markdown_templates/content/soft-skills/creativity/_index.html.md',
      markdownCommitId: 'd9771871c0cadc48e3d4141f93004b9c25d7201a',
      contentMd: rawMarkdownContent,
      yamlCommitId: 'd9771871c0cadc48e3d4141f93004b9c25d7201a',
      contentYaml: rawYamlContent,
    };

    axios.post.mockReturnValue(Promise.resolve(returnData));
    await expect(service.createVersion(chapterApiURL, chapterBody, apiKEY))
      .resolves.toEqual(returnData);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('chapter missing parameters couldn`t be created ', async () => {
    const rawMarkdownContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.html.md');
    const rawYamlContent = readMockFile('__mocks__/fixtures/priv/markdown_templates/content/back-end/sql/_index.yaml');

    const returnData = {
      data: {
        message: 'Parâmetros incorretos. (path, markdownCommitId, contentMd, yamlCommitId, contentYaml) são obrigatórios',
      },
      status: 400,
    };

    const chapterBody = {
      contentMd: rawMarkdownContent,
      contentYaml: rawYamlContent,
    };

    axios.post.mockReturnValue(Promise.resolve(returnData));
    await expect(service.createVersion(chapterApiURL, chapterBody, apiKEY))
      .resolves.toEqual(returnData);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});

describe('Create Version', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const versionApiURL = process.env.CONTENT_VERSION_API_URL;
  const apiKEY = process.env.API_KEY;

  test('creates one version sucessfully', async () => {
    const returnData = {
      data: '',
      status: 201,
    };

    const versionObj = {
      merge_commit_id: '086f1adba10ca38d91464225ac0ff96b9f717e44',
      timestamp: 1607012042854,
      chapter_ids: ['c54f3049-965a-4634-ae16-6e4251ef7e3e'],
    };

    axios.post.mockReturnValue(Promise.resolve(returnData));
    await expect(service.createVersion(versionApiURL, versionObj, apiKEY))
      .resolves.toEqual(returnData);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('version couldn`t be created ', async () => {
    const returnData = {
      data: { message: 'Esta versão já foi lançada anteriormente' },
      status: 422,
    };

    const versionObj = {
      merge_commit_id: '086f1adba10ca38d91464225ac0ff96b9f717e44',
      timestamp: 1607012042854,
      chapter_ids: ['c54f3049-965a-4634-ae16-6e4251ef7e3e'],
    };

    axios.post.mockReturnValue(Promise.reject(returnData));
    await expect(service.createVersion(versionApiURL, versionObj, apiKEY))
      .rejects.toEqual(returnData);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('version timestamp format is incorrect', async () => {
    const returnData = {
      data: { message: 'timestamp da versão está em formato incorreto' },
      status: 422,
    };

    const versionObj = {
      merge_commit_id: '086f1adba10ca38d91464225ac0ff96b9f717e44',
      timestamp: 'this-definitely-doesnt-seem-like-a-valid-time-stamp',
      chapter_ids: ['c54f3049-965a-4634-ae16-6e4251ef7e3e'],
    };

    axios.post.mockReturnValue(Promise.reject(returnData));
    await expect(service.createVersion(versionApiURL, versionObj, apiKEY))
      .rejects.toEqual(returnData);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('version has been already released', async () => {
    const returnData = {
      data: { message: 'Esta versão já foi lançada anteriormente' },
      status: 409,
    };

    const versionObj = {
      merge_commit_id: '086f1adba10ca38d91464225ac0ff96b9f717e44',
      timestamp: 1607012042854,
      chapter_ids: ['c54f3049-965a-4634-ae16-6e4251ef7e3e'],
    };

    axios.post.mockReturnValue(Promise.reject(returnData));
    await expect(service.createVersion(versionApiURL, versionObj, apiKEY))
      .rejects.toEqual(returnData);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test('returns invalid api token if not authorized', async () => {
    const data = { data: { error: 'invalid api token' }, status: 401 };

    const versionObj = {
      merge_commit_id: '086f1adba10ca38d91464225ac0ff96b9f717e44',
      timestamp: 1607012042854,
      chapter_ids: ['c54f3049-965a-4634-ae16-6e4251ef7e3e'],
    };

    axios.post.mockReturnValue(Promise.reject(data));
    await expect(service.createVersion(versionApiURL, versionObj, 'wrongkeybru')).rejects.toEqual(data);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
