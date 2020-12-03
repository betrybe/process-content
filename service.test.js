const axios = require('axios');
const service = require('./service');

jest.mock('axios');


describe('Create Chapters', () => {
  test('creates one chapter sucessfully', async () => {

  })
})


describe('Create Version', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('creates one version sucessfully', async () => {
    const returnData = {
      data: '',
      status: 201
    }

    const versionObj = {
      "merge_commit_id": "086f1adba10ca38d91464225ac0ff96b9f717e44",
      "timestamp": 1607012042854,
      "chapter_ids": ["c54f3049-965a-4634-ae16-6e4251ef7e3e"]
    }
  
    const config = {
      headers: { "X-api-content-key": "esse-aqui-eh-u-certo" }
    }

    axios.post.mockReturnValue(Promise.resolve(returnData));
    await expect(service.createVersion('dummy.url.dot', versionObj, config)).resolves.toEqual(returnData)
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `dummy.url.dot/api/content/version/release`,
      versionObj,
      config
    );
    
  });

  test('version couldn`t be created ', async () => {
    const returnData = {
      data: { message: "Esta versão já foi lançada anteriormente" },
      status: 422
    };

    const versionObj = {
      "merge_commit_id": "086f1adba10ca38d91464225ac0ff96b9f717e44",
      "timestamp": 1607012042854,
      "chapter_ids": ["c54f3049-965a-4634-ae16-6e4251ef7e3e"]
    }
  
    const config = {
      headers: { "X-api-content-key": "esse-aqui-eh-u-certo" }
    }

    axios.post.mockReturnValue(Promise.reject(returnData));
    await expect(service.createVersion('dummy.url.dot', versionObj, config)).rejects.toEqual(returnData)
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `dummy.url.dot/api/content/version/release`,
      versionObj,
      config
    );
  })

  test('version timestamp format is incorrect', async () => {
    const returnData = {
      data: { message: "timestamp da versão está em formato incorreto" },
      status: 422
    };
  
    const versionObj = {
      "merge_commit_id": "086f1adba10ca38d91464225ac0ff96b9f717e44",
      "timestamp": "this-definitely-doesnt-seem-like-a-valid-time-stamp",
      "chapter_ids": ["c54f3049-965a-4634-ae16-6e4251ef7e3e"]
    }
  
    const config = {
      headers: { "X-api-content-key": "esse-aqui-eh-u-certo" }
    }

    axios.post.mockReturnValue(Promise.reject(returnData));
    await expect(service.createVersion('dummy.url.dot', versionObj, config)).rejects.toEqual(returnData)
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `dummy.url.dot/api/content/version/release`,
      versionObj,
      config
    );
  });

  test('version has been already released', async () => {
    const returnData = {
      data: { message: 'Esta versão já foi lançada anteriormente' },
      status: 409
    };

    const versionObj = {
      "merge_commit_id": "086f1adba10ca38d91464225ac0ff96b9f717e44",
      "timestamp": 1607012042854,
      "chapter_ids": ["c54f3049-965a-4634-ae16-6e4251ef7e3e"]
    }
  
    const config = {
      headers: { "X-api-content-key": "esse-aqui-eh-u-certo" }
    }

    axios.post.mockReturnValue(Promise.reject(returnData));
    await expect(service.createVersion('dummy.url.dot', versionObj, config)).rejects.toEqual(returnData)
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `dummy.url.dot/api/content/version/release`,
      versionObj,
      config
    );
  })

  test('returns invalid api token if not authorized', async () => {
    const data = { data: { error: 'invalid api token' }, status: 401 };

    const versionObj = {
      "merge_commit_id": "086f1adba10ca38d91464225ac0ff96b9f717e44",
      "timestamp": 1607012042854,
      "chapter_ids": ["c54f3049-965a-4634-ae16-6e4251ef7e3e"]
    }
  
    const config = {
      headers: { "X-api-content-key": "covid-19-aqui-nao" }
    }

    axios.post.mockReturnValue(Promise.reject(data));
    await expect(service.createVersion('dummy.url.dot', versionObj, config)).rejects.toEqual(data)
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `dummy.url.dot/api/content/version/release`,
      versionObj,
      config
    );
  })
})