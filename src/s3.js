const core = require('@actions/core');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

/**
 * Extrai do caminho do arquivo a extensão.
 * @param {string} filePath
 * @returns {string}
 */
const extractFileExtension = (filePath) => {
  const extension = path.extname(filePath);
  return extension.slice(1);
};

const credentials = {
  accessKeyId: core.getInput('awsAccessKey') || process.env.AWS_ACCESS_KEY,
  secretAccessKey: core.getInput('awsSecret') || process.env.AWS_SECRET,
};

const imageUpload = (assetUrlHash, assetBlob, extension) => {
  const s3BucketClient = new AWS.S3(credentials);

  const params = {
    Bucket: core.getInput('bucketName') || process.env.BUCKET_NAME,
    Key: assetUrlHash,
    Body: assetBlob,
    ContentType: `image/${extension}`,
  };

  return s3BucketClient.upload(params, {}).promise();
};

const uploadToBucket = async (assetUrlHash, assetPath) => {
  try {
    const assetBlob = fs.readFileSync(assetPath);
    const extension = extractFileExtension(assetPath);

    const { Location } = await imageUpload(assetUrlHash, assetBlob, extension);

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
