import * as Pino from 'pino';
import { HttpStatusCodes } from '../enums';
const pino = Pino();

export const error = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    pino.error(err.message);
    ctx.body = { message: err.message };
    ctx.status = err.status || HttpStatusCodes.InternalServerError;
  }
};
