const joi = require("joi");
const { skillSchema } = require("./skill");

const userId = joi
  .number()
  .integer()
  .positive();
const firstName = joi.string().max(1024);
const lastName = joi.string().max(1024);
const email = joi
  .string()
  .email()
  .max(1024);
const skills = joi.array().items(joi.object().keys({ skill: skillSchema }));

const userSchema = joi.object().keys({
  id: userId.required(),
  firstName,
  lastName,
  email,
  skills
});

const userSchemaRequired = userSchema.requiredKeys(
  "firstName",
  "lastName",
  "email"
);

module.exports = {
  userId,
  firstName,
  lastName,
  email,
  skills,
  userSchema,
  userSchemaRequired
};
