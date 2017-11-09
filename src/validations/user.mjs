import joi from 'joi';
import { skillSchema } from './skill';

export const userId = joi.number().integer().positive();
export const firstName = joi.string().max(1024);
export const lastName = joi.string().max(1024);
export const email = joi.string().email().max(1024);
export const skills = joi.array().items(joi.object().keys({ skill: skillSchema }));

export const userSchema = joi.object().keys({
  id: userId.required(),
  firstName,
  lastName,
  email,
  skills,
});

export const userSchemaRequired = userSchema
  .requiredKeys('firstName', 'lastName', 'email');
