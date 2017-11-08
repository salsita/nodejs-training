import HTTPStatus from 'http-status';
import ClientError from './ClientError';

export default class UnauthorizedError extends ClientError {
  constructor(message, status = HTTPStatus.FORBIDDEN) {
    super(message, status);
  }
}
