import joi from 'joi';

export const skillId = joi.number().integer().positive();
export const skill = joi.string().max(1024);

export const skillSchema = joi.object().keys({
  id: skillId.required(),
  skill,
});

export const skillSchemaRequired = skillSchema
  .requiredKeys('skill');
