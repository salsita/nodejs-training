import HTTPStatus from 'http-status';
import ClientError from './ClientError';

export default class ValidationError extends ClientError {
  constructor(message, status = HTTPStatus.BAD_REQUEST) {
    super(message, status);
  }
}
