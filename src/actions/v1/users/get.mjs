import joi from 'joi';
import { skillDbToApi, userDbToApi } from '../mapping';
import { usersModel, userSkillsModel } from '../../../db';
import joiMiddleware from '../../joiMiddleware';
import { userId } from '../../../validations/user';
import NotFoundError from '../../../errors/NotFoundError';

/**
 * @api {get} /api/v1/users/:id Retrieve an user
 * @apiVersion 1.0.0
 * @apiName GetOne
 * @apiGroup Users
 *
 * @apiParam {Number} id The user id
 *
 * @apiUse UserResult200
 *
 * @apiSuccessExample {json} Success response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id": "123",
 *      "firstName": "John",
 *      "lastName": "Doe",
 *      "email": "john@doe.com",
 *      "skills": [
 *        {
 *          "skill": {
 *            "id": 1,
 *            "skill": "JavaScript programmer",
 *          }
 *        },
 *        {
 *          "skill": {
 *            "id": 2,
 *            "skill": "Java programmer",
 *          }
 *        }
 *      ]
 *     }
 *
 * @apiUse UserNotFoundError
 */
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
