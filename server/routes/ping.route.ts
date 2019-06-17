import * as Router from 'koa-router';

const router = new Router();

router
  .get('/', ctx => {
    ctx.body = 'pong';
    ctx.status = 200;
  });

export default router;