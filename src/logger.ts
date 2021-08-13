import * as core from '@actions/core';

const loggerDisplay = (params: Record<string, unknown>, display: (value: string) => void) => {
  const logEntries = Object.entries(params);

  return logEntries.forEach((entrie) => {
    display(`${entrie[0]}: ${entrie[1]}`);
  });
};

const Logger = {
  error: (args: Record<string, unknown>) => { loggerDisplay(args, core.error); },
  setFailed: (args: Record<string, unknown>) => { loggerDisplay(args, core.setFailed); },
  info: (args: Record<string, unknown>) => { loggerDisplay(args, core.info); },
};

export default Logger;
