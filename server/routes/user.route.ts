
import * as Router from 'koa-router';
import { Context, ParameterizedContext } from 'koa';
import { UserController } from '../controller/user.controller';
import { User } from '../model/user.model';

const router = new Router();
const userController = new UserController();
router
  .post(
    '/',
    async (ctx: ParameterizedContext<Context>) =>
      (ctx.body = await userController.create(ctx, <User>(ctx.request.body))),
  );

export default router;