import HTTPStatus from 'http-status';
import ClientError from './ClientError';

export default class DBError extends ClientError {
  constructor(originalError, status = HTTPStatus.INTERNAL_SERVER_ERROR) {
    super('DB Error', status);
    this.originalError = originalError;
  }
}
