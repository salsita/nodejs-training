const HTTPStatus = require('http-status');
const ValidationError = require('./ValidationError');

const formatErrorMessage = err =>
  err.details
    .map(e => e.message)
    .join(', ');

module.exports = class JoiError extends ValidationError {
  constructor(originalError, status = HTTPStatus.BAD_REQUEST) {
    super(formatErrorMessage(originalError), status);
    this.originalError = originalError;
  }
};
