import ExtendableError from './ExtendableError';

export default class ClientError extends ExtendableError {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.expose = true;
  }
}
