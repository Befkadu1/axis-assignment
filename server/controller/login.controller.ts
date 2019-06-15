import { Context, ParameterizedContext } from 'koa';
import { User } from '../model/user.model';
import { LoginRepository } from '../repository/login.repository';
import { HttpStatusCodes } from '../enums';


export class LoginController {
  constructor(private loginRepo = new LoginRepository()) {}
  async login( ctx: ParameterizedContext<Context>, values: User): Promise<Partial<User>> {
    ctx.status = HttpStatusCodes.Ok;
    return this.loginRepo.login(values);
  }

}
