import HTTPStatus from 'http-status';
import ValidationError from './ValidationError';

const formatErrorMessage = err =>
  err.details
    .map(e => e.message)
    .join(', ');

export default class JoiError extends ValidationError {
  constructor(originalError, status = HTTPStatus.BAD_REQUEST) {
    super(formatErrorMessage(originalError), status);
    this.originalError = originalError;
  }
}
