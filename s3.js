const core = require('@actions/core');
const S3 = require('aws-sdk/clients/s3');

const awsClientS3 = (accessKeyId, secretAccessKey) => new S3({
  params: {
    Bucket: 'assets.app.betrybe.com',
  },
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const uploadToBucket = async (s3BucketClient, assetBlob, assetPath) => {
  try {
    const params = {
      Key: assetPath,
      Body: JSON.stringify(assetBlob),
    };

    const { ETag } = await s3BucketClient.putObject(params).promise();
    if (ETag) return;
  } catch (error) {
    core.setFailed(`Error at uploading files to S3: ${error.message}`);
  }
};

module.exports = {
  awsClientS3,
  uploadToBucket,
};
