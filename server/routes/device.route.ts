import * as Router from 'koa-router';
import { Context, ParameterizedContext } from 'koa';
import { DeviceController } from '../controller/device.controller';

const router = new Router();
const deviceController = new DeviceController();
router
  .get(
    '/',
    async (ctx: ParameterizedContext<Context>) =>
      (ctx.body = await deviceController.getAll(ctx, ctx.state.email)),
  );

export default router;