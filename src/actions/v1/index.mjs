import Router from 'koa-router';

import skills from './skills';
import users from './users';

const router = new Router();

router.use('/skills', skills.routes(), skills.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

export default router;
