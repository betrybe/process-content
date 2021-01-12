const fs = require('fs');
const s3Service = require('../src/s3');

const readMockFile = (path) => fs.readFileSync(path, 'utf8');
const putObjectOutputMock = { promise: jest.fn().mockResolvedValue({ ETag: 'bebda3f165aede5d08136413d13dca70' }) };
const putObjectMock = jest.fn(() => putObjectOutputMock);
const mockS3 = {
  putObject: putObjectMock,
};

jest.mock('aws-sdk', () => ({ S3: jest.fn(() => mockS3) }));

describe('S3 Client Actions', () => {
  afterEach(() => jest.resetAllMocks());

  test('Uploads a new Object to Bucket', async () => {
    const assetPath = '__mocks__/fixtures/assets/static/agile/scrum.png';
    const rawAssetBlob = readMockFile(assetPath);

    const result = await s3Service.uploadToBucket(rawAssetBlob, assetPath);

    expect(typeof result).toBe('string');
    expect(result).toEqual('bebda3f165aede5d08136413d13dca70');
    expect(putObjectMock).toHaveBeenCalled();
  });
});
