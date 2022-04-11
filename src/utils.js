const sanitizeExtension = (file) => file.replace(/\.[^/.]+$/, '');

const getExtension = (file) => file.split('.').pop();

const verifyFileMatching = (file1, file2) =>
  sanitizeExtension(file1).includes(sanitizeExtension(file2))
    && getExtension(file1) !== getExtension(file2);

const sanitizeFilesArray = (fileArray) =>
  fileArray.split('\n').filter((file) => getExtension(file) !== 'eex' && file !== '' && getExtension(file) !== 'mp4');

const isFigure = (extension) => (/\.(gif|jpe?g|tiff?|png|webp|svg)$/i).test(extension);

const urlSanitizer = (url) => {
  if (isFigure(url)) return url.replace('https://', 'https:\\/\\/');
  return url;
};

const useCachedUrl = (url) => {
  const regex = /(https:)(.+?)\/(assets.app.betrybe.com)(.+)/;
  return regex.test(url) ? urlSanitizer(url.replace(regex, "$1//$3$4")) : url;
};

module.exports = {
  sanitizeExtension,
  verifyFileMatching,
  sanitizeFilesArray,
  urlSanitizer,
  useCachedUrl,
};
