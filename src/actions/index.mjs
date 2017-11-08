import HTTPStatus from 'http-status';
import Router from 'koa-router';
import errorMiddleware from './errorMiddleware';
import config from '../config';
import NotFoundError from '../errors/NotFoundError';

import v1 from './v1';

const { apiBase } = config;
const router = new Router({
  prefix: apiBase,
});

router.use(errorMiddleware);
router.use('/v1', v1.routes(), v1.allowedMethods());
router.all('(.*)', () => {
  throw new NotFoundError(HTTPStatus[HTTPStatus.NOT_FOUND]);
});

export default router;
