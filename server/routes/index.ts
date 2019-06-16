import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';

import loginRoutes from './login.route';
import pingRoutes from './ping.route';
import deviceRoutes from './device.route';
import userRoutes from './user.route';
import siteRoutes from './site.route';
import { auth } from '../middleware/auth';
const logger = require('koa-pino-logger');

export const router = new Router();

router.use(bodyParser({}), logger());
router.use('/ping', pingRoutes.routes(), pingRoutes.allowedMethods());
router.use('/login', loginRoutes.routes(), loginRoutes.allowedMethods());
router.use('/devices', auth, deviceRoutes.routes(), deviceRoutes.allowedMethods());
router.use('/users', userRoutes.routes(), userRoutes.allowedMethods());
router.use('/sites', siteRoutes.routes(), siteRoutes.allowedMethods());
