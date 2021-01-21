const logger = require('../src/logger');
const process = require('child_process')

describe('Logger OutPuts', () => {
  test('', () => {

    // filePath, loggerStep, statusCode, message
    logger.error(['path', 'chapter', 200, 'wow']);
  })
});


// Assert that process.stdout.write calls called only with the given arguments.
function assertWriteCalls(calls) {
  expect(process.stdout.write).toHaveBeenCalledTimes(calls.length)

  for (let i = 0; i < calls.length; i++) {
    expect(process.stdout.write).toHaveBeenNthCalledWith(i + 1, calls[i])
  }
}
