const core = require('@actions/core');
const AWS = require('aws-sdk');
const fs = require('fs');
const logger = require('./logger');

const credentials = {
  accessKeyId: core.getInput('awsAccessKey') || process.env.AWS_ACCESS_KEY,
  secretAccessKey: core.getInput('awsSecret') || process.env.AWS_SECRET,
};

const imageUpload = (assetUrlHash, assetBlob, fileType) => {
  const s3BucketClient = new AWS.S3(credentials);

  const params = {
    Bucket: core.getInput('bucketName') || process.env.BUCKET_NAME,
    Key: assetUrlHash,
    Body: assetBlob,
    ContentType: `image/${fileType}`,
  };

  return s3BucketClient.upload(params, {}).promise();
};

const uploadToBucket = async (assetUrlHash, assetPath, fileType) => {
  try {
    const assetBlob = fs.readFileSync(assetPath);

    const { Location } = await imageUpload(assetUrlHash, assetBlob, fileType);

    return Location;
  } catch (error) {
    const logBody = {
      path: assetPath,
      step: 'Asset',
      statusCode: 500,
      message: error.message,
    };
    return logger.setFailed(logBody);
  }
};

module.exports = {
  uploadToBucket,
  imageUpload,
};
