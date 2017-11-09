import { userApiToDB, userDbToApi, skillDbToApi } from '../mapping';
import { create } from '../../../services/users';
import { userSkillsModel } from '../../../db';
import joiMiddleware from '../../joiMiddleware';
import { userSchemaRequired } from '../../../validations/user';

export default [
  joiMiddleware([
    {
      get: ctx => ctx.request.body,
      schema: userSchemaRequired.forbiddenKeys('id').required(),
    },
  ]),

  async (ctx) => {
    const { body } = ctx.request;
    const user = userApiToDB(body);
    const skills = body.skills || [];
    const skillIds = skills.map(skill => skill.skill.id);

    const { user: createdUser } = await create(user, skillIds);

    const createdSkills = await userSkillsModel.findSkillsForUser(createdUser.userId);

    ctx.body = {
      ...userDbToApi(createdUser),
      skills: createdSkills.map(skill => ({ skill: skillDbToApi(skill) })),
    };
  },
];
