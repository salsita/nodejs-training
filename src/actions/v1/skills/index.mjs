import Router from 'koa-router';

import list from './list';

const router = new Router();

router.get('/', ...list);

export default router;
