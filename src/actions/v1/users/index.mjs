import Router from 'koa-router';

import list from './list';
import create from './create';
import get from './get';
import patch from './patch';
import remove from './remove';

const router = new Router();

router.get('/', ...list);
router.post('/', ...create);
router.get('/:id', ...get);
router.patch('/:id', ...patch);
router.del('/:id', ...remove);

export default router;
