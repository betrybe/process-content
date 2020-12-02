const util = require('util');
const bashExec = util.promisify(require("child_process").exec);

const getFiles = async (path) => {
  const { stdout, stderr } = await bashExec(`git ls-files ${path}`)

  if (stderr) return console.log(`Couldn't getFiles because: `, stderr)

  const arrayOfFiles = stdout.split("\n");

  return arrayOfFiles;
}

const buildChapters = async (path) => {
  const arrayOfFiles = await getFiles(path);

}

module.exports = {
  buildChapters
}
