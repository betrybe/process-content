const path = require('path');

const sanitizeExtension = (file) => file.replace(/\.[^/.]+$/, '');

const verifyFileMatching = (file1, file2) =>
  sanitizeExtension(file1).includes(sanitizeExtension(file2))
  && path.extname(file1) !== path.extname(file2);

const sanitizeFilesArray = (fileArray) =>
  fileArray.split('\n').filter((file) => path.extname(file) !== 'eex' && file !== '' && path.extname(file) !== 'mp4');

const urlSanitizer = (url) => url.replace('https://', 'https:\\/\\/');

module.exports = {
  sanitizeExtension,
  verifyFileMatching,
  sanitizeFilesArray,
  urlSanitizer,
};
