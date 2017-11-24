import joi from 'joi';
import HTTPStatus from 'http-status';
import { usersModel } from '../../../db';
import joiMiddleware from '../../joiMiddleware';
import { userId } from '../../../validations/user';
import NotFoundError from '../../../errors/NotFoundError';

/**
 * @api {delete} /api/v1/users/:id Delete an user
 * @apiVersion 1.0.0
 * @apiName Delete
 * @apiGroup Users
 *
 * @apiParam {String} id The user id
 *
 * @apiSuccessExample {json} Success response:
 *     HTTP/1.1 204 No Content
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
    const user = await usersModel.removeById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    ctx.status = HTTPStatus.NO_CONTENT;
  },
];
