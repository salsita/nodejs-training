import HTTPStatus from 'http-status';
import ValidationError from './ValidationError';

export default class NotFoundError extends ValidationError {
  constructor(message, status = HTTPStatus.NOT_FOUND) {
    super(message, status);
  }
}
