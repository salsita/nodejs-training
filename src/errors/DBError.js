const HTTPStatus = require("http-status");
const ClientError = require("./ClientError");

module.exports = class DBError extends ClientError {
  constructor(originalError, status = HTTPStatus.INTERNAL_SERVER_ERROR) {
    super("DB Error", status);
    this.originalError = originalError;
  }
};
