const HTTPStatus = require("http-status");
const ClientError = require("./ClientError");

module.exports = class UnauthorizedError extends ClientError {
  constructor(message, status = HTTPStatus.FORBIDDEN) {
    super(message, status);
  }
};
