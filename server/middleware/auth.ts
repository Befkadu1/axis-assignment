// import { HttpStatusCodes } from '../enums';
import { Context, ParameterizedContext } from 'koa';
import config from '../config/private-key';
import { HttpStatusCodes } from '../enums';
let jwt = require('jsonwebtoken');

export const auth = async (
  ctx: ParameterizedContext<Context>,
  next: Function,
) => {
  const result = await getUserAccountAndtoken(ctx);
  ctx.state = {
    ...ctx.state,
    ...result,
  };
  return next();
};

async function getUserAccountAndtoken(ctx: ParameterizedContext<Context>) {
  let token;
  let email: string;

  const authorization = ctx.get('Authorization');
 
  if (authorization) {
    token = authorization.split(' ')[1]; // removing the word bearer
  }

  // const decoded = (token && jwt.decode(token)) || {};
  // if (decoded) {
  //   email = decoded.email;
  // }

  // if (!email) {
  //   ctx.throw(HttpStatusCodes.Unauthorized, { message: 'Unauthorized' });
  // }

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      ctx.throw(
        HttpStatusCodes.InternalServerError,
        { message: err.message }
      );
    }
    email = decoded.email;
  });

  return {
    email,
    // token,
  };
}
