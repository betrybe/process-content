const core = require('@actions/core');

const loggerDisplay = (params, display) => {
  const logEntries = Object.entries(params);

  return logEntries.forEach((entrie) => {
    display(`${entrie[0]}: ${entrie[1]}`);
  });
};

const Logger = {
  error: (args) => { loggerDisplay(args, core.error); },
  setFailed: (args) => { loggerDisplay(args, core.setFailed); },
  info: (args) => { loggerDisplay(args, core.info); },
};

module.exports = Logger;
