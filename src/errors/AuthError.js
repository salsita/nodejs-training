const HTTPStatus = require("http-status");
const ClientError = require("./ClientError");

module.exports = class AuthError extends ClientError {
  constructor(message, status = HTTPStatus.UNAUTHORIZED) {
    super(message, status);
  }
};
