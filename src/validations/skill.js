const joi = require('joi');

const skillId = joi.number().integer().positive();
const skill = joi.string().max(1024);

const skillSchema = joi.object().keys({
  id: skillId.required(),
  skill,
});

const skillSchemaRequired = skillSchema
  .requiredKeys('skill');

module.exports = {
  skillId,
  skill,
  skillSchema,
  skillSchemaRequired,
};
