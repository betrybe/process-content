const core = require('@actions/core');
const AWS = require('aws-sdk');
const fs = require('fs');
const logger = require('./logger');

const credentials = {
  accessKeyId: core.getInput('awsAccessKey') || process.env.AWS_ACCESS_KEY,
  secretAccessKey: core.getInput('awsSecret') || process.env.AWS_SECRET,
};

const uploadToBucket = async (assetUrlHash, assetPath, fileType) => {
  try {
    const s3BucketClient = new AWS.S3(credentials);

    const assetBlob = fs.readFileSync(assetPath);

    const params = {
      Bucket: core.getInput('bucketName') || process.env.BUCKET_NAME,
      Key: assetUrlHash,
      Body: assetBlob,
      ContentType: `image/${fileType}`,
    };

    const { ETag } = await s3BucketClient.putObject(params).promise();

    return ETag;
  } catch (error) {
    return logger.setFailed(assetPath, 'asset', 500, error.message);
  }
};

module.exports = {
  uploadToBucket,
};
