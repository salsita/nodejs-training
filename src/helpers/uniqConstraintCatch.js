const DBError = require('../errors/DBError');
const ValidationError = require('../errors/ValidationError');

module.exports = (constraints, fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (err) {
    if (err instanceof DBError && err.originalError.code === '23505') {
      const constraint = constraints[err.originalError.constraint];
      if (constraint) {
        throw new ValidationError(constraint);
      }
    }

    throw err;
  }
};
