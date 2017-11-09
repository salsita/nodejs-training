import HTTPStatus from 'http-status';
import ClientError from './ClientError';

export default class NotFoundError extends ClientError {
  constructor(message, status = HTTPStatus.NOT_FOUND) {
    super(message, status);
  }
}
