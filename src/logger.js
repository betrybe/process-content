const core = require('@actions/core');

const steps = {
  chapter: 'Chapter',
  asset: 'Asset',
};

const loggerDisplay = (params, display) => {
  const [filePath, loggerStep, statusCode, message] = params;
  display(`----------- Error at Processing ${steps[loggerStep]} ------------`);
  display(`File Path: ${filePath}`);
  display(`Status code: ${statusCode}`);
  display(`Error Message: ${message}`);
};

const Logger = {
  error: (...args) => { loggerDisplay(args, core.error); },
  setFailed: (...args) => { loggerDisplay(args, core.setFailed); },
};

module.exports = Logger;
