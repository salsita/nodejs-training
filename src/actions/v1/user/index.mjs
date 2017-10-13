import Router from 'koa-router';

import list from './list';
import get from './get';

const router = new Router();

router.get('/', list);
router.get('/:id', get);

export default router;
