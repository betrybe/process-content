const sanitizeExtension = (file) => file.replace(/\.[^/.]+$/, '');

const getExtension = (file) => file.split('.').pop();

const verifyFileMatching = (file1, file2) =>
  sanitizeExtension(file1).includes(sanitizeExtension(file2))
    && getExtension(file1) !== getExtension(file2);

const sanitizeFilesArray = (fileArray) =>
  fileArray.split('\n').filter((file) => getExtension(file) !== 'eex' && file !== '' && getExtension(file) !== 'mp4');

const urlSanitizer = (url) =>  {
  if(isFigure(url)) return url.replace('https://', 'https:\\/\\/');
  return url;
}

const isFigure = (extension) => (/\.(gif|jpe?g|tiff?|png|webp|svg)$/i).test(extension);

module.exports = {
  sanitizeExtension,
  verifyFileMatching,
  sanitizeFilesArray,
  urlSanitizer,
};
