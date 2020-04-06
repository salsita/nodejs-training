const joi = require("@hapi/joi");
const { skillSchema } = require("./skill");

const userId = joi.number().integer().positive();
const firstName = joi.string().max(1024);
const lastName = joi.string().max(1024);
const email = joi.string().email().max(1024);
const skills = joi.array().items(joi.object().keys({ skill: skillSchema }));

const userSchema = joi.object().keys({
  id: userId.required(),
  firstName,
  lastName,
  email,
  skills,
});

const userSchemaRequired = userSchema.fork(
  ["firstName", "lastName", "email"],
  (schema) => schema.required()
);

module.exports = {
  userId,
  firstName,
  lastName,
  email,
  skills,
  userSchema,
  userSchemaRequired,
};
