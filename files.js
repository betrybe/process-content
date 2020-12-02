const util = require('util');
const bashExec = util.promisify(require("child_process").exec);

const getFiles = async (path) => {
  const { stdout, stderr } = await bashExec(`git ls-files ${path}`);

  if (stderr) return console.log(`Couldn't getFiles because: `, stderr)

  const arrayOfFiles = stdout.split("\n");

  return arrayOfFiles;
};

const groupFiles = (filesArr) => {
  let newArr = [];
  filesArr.reduce((acc, curr) => {
    if (!acc) return acc = curr;

    const filesMatch = verifyFiles(acc, curr);

    if (filesMatch) {
      newArr.push({
        markdown: acc,
        yaml: curr,
      });
    }
  });

  return newArr;
};

const sanitizeExtension = (file) => {
  return file.replace(/\.[^/.]+$/, "");
};

const getExtension = (file) => {
  return file.split('.').pop();
};

const verifyFiles = (file1, file2) => {
  return sanitizeExtension(file1).includes(sanitizeExtension(file2)) &&
    getExtension(file1) !== getExtension(file2);
};


const buildChapters = async (path) => {
  const arrayOfFiles = await getFiles(path);

  const groupedChapters = groupFiles(arrayOfFiles);

}

module.exports = {
  buildChapters
}
