const core = require('@actions/core');
const AWS = require('aws-sdk');
const fs = require('fs');
const mime = require('mime');
const logger = require('./logger');

const credentials = {
  accessKeyId: core.getInput('awsAccessKey') || process.env.AWS_ACCESS_KEY,
  secretAccessKey: core.getInput('awsSecret') || process.env.AWS_SECRET,
};

export const imageUpload = (assetUrlHash: string, assetBlob: string, assetType: string) => {
  const s3BucketClient = new AWS.S3(credentials);

  const params = {
    Bucket: core.getInput('bucketName') || process.env.BUCKET_NAME,
    Key: assetUrlHash,
    Body: assetBlob,
    ContentType: assetType,
  };

  return s3BucketClient.upload(params, {}).promise();
};

export const uploadToBucket = async (assetUrlHash: string, assetPath: string) => {
  try {
    const assetBlob = fs.readFileSync(assetPath);
    const assetType = mime.getType(assetPath);

    const { Location } = await imageUpload(assetUrlHash, assetBlob, assetType);

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
