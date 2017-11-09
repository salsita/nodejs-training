import _ from 'lodash';
import { skillDbToApi, userDbToApi } from '../mapping';
import { usersModel, skillsModel, userSkillsModel } from '../../../db';

export default [
  async (ctx) => {
    const users = await usersModel.findAll();
    const skills = _.keyBy(
      (await skillsModel.findAll()).map(skillDbToApi),
      'id'
    );
    const skillsByUser = _.chain(await userSkillsModel.findAll())
      .groupBy('userId')
      .mapValues(userSkills => userSkills.map(({ skillId }) => ({ skill: skills[skillId] })))
      .value();

    ctx.body = users
      .map(user => ({
        ...userDbToApi(user),
        skills: skillsByUser[user.userId] || [],
      }));
  },
];
