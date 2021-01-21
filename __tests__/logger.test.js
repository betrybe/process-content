const core = require('@actions/core');
const logger = require('../src/logger');

describe('Logger OutPuts', () => {
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

    spyError.mockRestore();
  });

  test('Invokes setFailed output when logging an failed action', () => {
    const spyError = jest.spyOn(core, 'error');

    const logBody = {
      path: '/content/toot/file',
      step: 'Chapter',
      statusCode: 500,
      message: 'Failed at executing',
    };

    logger.setFailed(logBody);
    expect(spyError).toHaveBeenCalled();

    spyError.mockRestore();
  });

  test('Invokes info output when logging an info', () => {
    const spyError = jest.spyOn(core, 'error');

    const logBody = {
      message: 'Success',
    };

    logger.info(logBody);
    expect(spyError).toHaveBeenCalled();

    spyError.mockRestore();
  });
});
