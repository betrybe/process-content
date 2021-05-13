const fs = require('fs');
const s3Service = require('../src/s3');

const readMockFile = (path) => fs.readFileSync(path, 'utf8');
const uploadOutputMock = { promise: jest.fn().mockResolvedValue({ Location: '__mocks__/fixtures/assets/static/agile/scrum-213c790c4129428a74486324d08e78e7.png' }) };
const uploadMock = jest.fn(() => uploadOutputMock);
const mockS3 = {
  upload: uploadMock,
};

jest.mock('aws-sdk', () => ({ S3: jest.fn(() => mockS3) }));

describe('S3 Client Actions', () => {
  afterEach(() => jest.resetAllMocks());

  test('Uploads a new Object to Bucket', async () => {
    const assetPath = '__mocks__/fixtures/assets/static/agile/scrum.png';
    const rawAssetBlob = readMockFile(assetPath);

    const result = await s3Service.imageUpload(rawAssetBlob, assetPath, 'png');

    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('Location', '__mocks__/fixtures/assets/static/agile/scrum-213c790c4129428a74486324d08e78e7.png');
    expect(uploadMock).toHaveBeenCalled();
  });
});
