const HTTPStatus = require('http-status');
const ClientError = require('./ClientError');

module.exports = class NotFoundError extends ClientError {
  constructor(message, status = HTTPStatus.NOT_FOUND) {
    super(message, status);
  }
};
