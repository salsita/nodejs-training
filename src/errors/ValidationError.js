const HTTPStatus = require("http-status");
const ClientError = require("./ClientError");

module.exports = class ValidationError extends ClientError {
  constructor(message, status = HTTPStatus.BAD_REQUEST) {
    super(message, status);
  }
};
