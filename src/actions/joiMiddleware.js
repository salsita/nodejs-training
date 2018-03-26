const joi = require("joi");
const JoiError = require("../errors/JoiError");

module.exports = (schemas, options = {}) => {
  const extOptions = {
    ...options,
    abortEarly: options.abortEarly === undefined ? false : options.abortEarly
  };
  return async (ctx, next) => {
    try {
      await Promise.all(
        schemas.map(({ get, schema }) =>
          joi.validate(get(ctx), schema, extOptions)
        )
      );
    } catch (err) {
      throw new JoiError(err);
    }
    await next();
  };
};
