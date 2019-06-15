import * as Router from 'koa-router';
import { Context, ParameterizedContext } from 'koa';
import { User } from '../model/user.model';
import { LoginController } from '../controller/login.controller';

const router = new Router();
const loginController = new LoginController();
router
  .post(
    '/',
    async (ctx: ParameterizedContext<Context>) =>
      (ctx.body = await loginController.login(ctx, <User>(ctx.request.body))),
  );

export default router;