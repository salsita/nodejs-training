import joi from 'joi';
import { userApiToDB, userDbToApi, skillDbToApi } from '../mapping';
import { patch } from '../../../services/users';
import { userSkillsModel } from '../../../db';
import joiMiddleware from '../../joiMiddleware';
import { userSchemaRequired, userId } from '../../../validations/user';

export default [
  joiMiddleware([
    {
      get: ctx => ctx.params,
      schema: joi.object().keys({
        id: userId.required(),
      }),
    },
    {
      get: ctx => ctx.request.body,
      schema: userSchemaRequired.forbiddenKeys('id').required(),
    },
  ]),

  async (ctx) => {
    const { params: { id }, request: { body } } = ctx;

    const user = userApiToDB(body);
    const skillIds = body.skills && body.skills.map(skill => skill.skill.id);

    const { user: updatedUser } = await patch(id, user, skillIds);

    const updatedSkills = await userSkillsModel.findSkillsForUser(id);

    ctx.body = {
      ...userDbToApi(updatedUser),
      skills: updatedSkills.map(skill => ({ skill: skillDbToApi(skill) })),
    };
  },
];
