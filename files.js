const util = require('util');
const { exec } = require("child_process")
const bashExec = util.promisify(exec);

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

const getCommitId = async (path) => {
  const { stdout, stderr } = await bashExec(`git log -n 1 --pretty=format:%H -- ${path}`);

  if (stderr) {
    return console.log(`deu getCommitIds ruim because: `, stderr)
  }

  return stdout;
}

const getRawContent = async (commitId, path) => {
  const { stdout, stderr } = await bashExec(`git cat-file -p ${commitId}:${path}`);

  if (stderr) {
    return console.log(`deu getRawContent ruim because: `, stderr)
  }

  return stdout;
}

const extractFileData = async (chapterObj) => {
  console.log(Object.entries(chapterObj))
  for (const [type, path] of Object.entries(chapterObj)) {
    const commitId = await getCommitId(path);
    const rawContent = await getRawContent(commitId, path);
    return getBuildChapterObj(type, commitId, rawContent, chapterObj)
  }
}

const getBuildChapterObj = (type, commitId, rawContent, chapter) => {
  if (type === "markdown") {
    return {
      ...chapter,
      markdown_commit_id: commitId,
      content_md: rawContent
    }
  } else {
    return {
      ...chapter,
      yaml_commit_id: commitId,
      content_yaml: rawContent
    }
  }
}

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

  return Promise.all(
    groupedChapters.map(chapterObj => extractFileData(chapterObj))
  )
}

module.exports = {
  buildChapters,
  getFiles,
  groupFiles,
  getCommitId,
  getRawContent,
  extractFileData,
  getBuildChapterObj
}
