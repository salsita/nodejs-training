import { skillDbToApi } from '../mapping';
import { skillsModel } from '../../../db';

export default [
  async (ctx) => {
    ctx.body = (await skillsModel.findAll()).map(skillDbToApi);
  },
];
