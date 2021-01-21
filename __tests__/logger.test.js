const core = require('@actions/core');
const logger = require('../src/logger');

describe('Logger OutPuts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Invokes error output when logging an error', () => {
    const spyError = jest.spyOn(core, 'error');

    const logBody = {
      path: '/content/toot/file',
      step: 'Chapter',
      statusCode: 400,
      message: 'Failed at executing',
    };

    logger.error(logBody);
    expect(spyError).toHaveBeenCalled();
    expect(spyError).toHaveBeenCalledTimes(4);
    expect(spyError).toHaveBeenCalledWith('path: /content/toot/file');
    expect(spyError).toHaveBeenCalledWith('step: Chapter');
    expect(spyError).toHaveBeenCalledWith('statusCode: 400');
    expect(spyError).toHaveBeenCalledWith('message: Failed at executing');
  });

  test('Invokes setFailed output when logging an failed action', () => {
    const spyError = jest.spyOn(core, 'setFailed');

    const logBody = {
      path: '/content/toot/file',
      step: 'Chapter',
      statusCode: 500,
      message: 'Failed at executing',
    };

    logger.setFailed(logBody);
    expect(spyError).toHaveBeenCalled();
    expect(spyError).toHaveBeenCalledTimes(4);
    expect(spyError).toHaveBeenCalledWith('path: /content/toot/file');
    expect(spyError).toHaveBeenCalledWith('step: Chapter');
    expect(spyError).toHaveBeenCalledWith('statusCode: 500');
    expect(spyError).toHaveBeenCalledWith('message: Failed at executing');
  });

  test('Invokes info output when logging an info', () => {
    const spyError = jest.spyOn(core, 'info');

    const logBody = {
      message: 'Success',
    };

    logger.info(logBody);
    expect(spyError).toHaveBeenCalled();
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledWith('message: Success');
  });
});
