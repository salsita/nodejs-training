const joi = require("@hapi/joi");

const skillId = joi.number().integer().positive();
const skill = joi.string().max(1024);

const skillSchema = joi.object().keys({
  id: skillId.required(),
  skill,
});

const skillSchemaRequired = skillSchema.fork(["skill"], (schema) =>
  schema.required()
);

module.exports = {
  skillId,
  skill,
  skillSchema,
  skillSchemaRequired,
};
