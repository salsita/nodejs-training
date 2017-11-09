import joi from 'joi';
import HTTPStatus from 'http-status';
import { usersModel } from '../../../db';
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
    const user = await usersModel.removeById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    ctx.status = HTTPStatus.NO_CONTENT;
  },
];
