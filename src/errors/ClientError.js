const ExtendableError = require("./ExtendableError");

module.exports = class ClientError extends ExtendableError {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.expose = true;
  }
};
