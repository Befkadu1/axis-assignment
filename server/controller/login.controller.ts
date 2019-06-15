import { Context, ParameterizedContext } from 'koa';
import { User } from '../model/user.model';
import { LoginRepository } from '../repository/login.repository';
import { HttpStatusCodes } from '../enums';
import { UserRepository } from '../repository/user.repository';


export class LoginController {
  constructor(
    private loginRepo = new LoginRepository(),
    private userRepository = new UserRepository()) {}

  async login(ctx: ParameterizedContext<Context>, values: User): Promise<Partial<User>> {
    const email = values.email;
    const password = values.password;
    ctx.status = HttpStatusCodes.Ok;
    const getPerson = await this.userRepository.getByEmailAndPassword(ctx, email, password);
    if (!getPerson) {
      ctx.throw(HttpStatusCodes.NotFound, { message: 'Invalid email or password' });
    }
    const person = await this.loginRepo.updateToken(getPerson); // updating the token when the user logs in
    if (!person) {
      ctx.throw(HttpStatusCodes.InternalServerError, { message: 'Error in updating a token' })
    }
    return person;  
  }

}
