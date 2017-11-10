import { skillDbToApi } from '../mapping';
import { skillsModel } from '../../../db';

/**
 * @api {get} /api/v1/skills Retrieve all skills
 * @apiVersion 1.0.0
 * @apiName GetAll
 * @apiGroup Skills
 *
 * @apiUse SkillResult200
 *
 * @apiSuccessExample {json} Success response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "skill": {
 *        "id": 1,
 *        "skill": "JavaScript programmer",
 *       }
 *      },
 *      {
 *       "skill": {
 *        "id": 2,
 *        "skill": "Java programmer",
 *       }
 *      },
 *      {
 *       "skill": {
 *        "id": 3,
 *        "skill": "C# programmer",
 *       }
 *      }
 *     ]
 */
export default [
  async (ctx) => {
    ctx.body = (await skillsModel.findAll()).map(skillDbToApi);
  },
];
