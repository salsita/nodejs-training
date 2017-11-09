import joi from 'joi';
import { skillDbToApi, userDbToApi } from '../mapping';
import { usersModel, userSkillsModel } from '../../../db';
import joiMiddleware from '../../joiMiddleware';
import { userId } from '../../../validations/user';
import NotFoundError from '../../../errors/NotFoundError';

export default [
  joiMiddleware([
    {
      get: ctx => ctx.params,
      schema: joi.object().keys({
        id: userId.required(),
      }),
    },
  ]),

  async (ctx) => {
    const { id } = ctx.params;
    const user = await usersModel.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const skills = await userSkillsModel.findSkillsForUser(id);

    ctx.body = {
      ...userDbToApi(user),
      skills: skills.map(skill => ({ skill: skillDbToApi(skill) })),
    };
  },
];
