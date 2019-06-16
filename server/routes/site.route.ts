import * as Router from 'koa-router';
import { Context, ParameterizedContext } from 'koa';
import { SiteController } from '../controller/site.controller';

const router = new Router();
const siteController = new SiteController();
router
  .get(
    '/',
    async (ctx: ParameterizedContext<Context>) =>
      (ctx.body = await siteController.getAll(ctx)),
  );

export default router;