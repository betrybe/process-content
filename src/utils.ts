export const sanitizeExtension = (file: string) => file.replace(/\.[^/.]+$/, '');

export const getExtension = (file: string) => file.split('.').pop();

export const verifyFileMatching = (file1: string, file2: string) =>
  sanitizeExtension(file1).includes(sanitizeExtension(file2))
    && getExtension(file1) !== getExtension(file2);

export const sanitizeFilesArray = (fileArray: string) =>
  fileArray.split('\n').filter((file) => getExtension(file) !== 'eex' && file !== '' && getExtension(file) !== 'mp4');

export const isFigure = (extension: string) => (/\.(gif|jpe?g|tiff?|png|webp|svg)$/i).test(extension);

export const urlSanitizer = (url: string) => {
  if (isFigure(url)) return url.replace('https://', 'https:\\/\\/');
  return url;
};
