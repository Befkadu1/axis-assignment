import { Context, ParameterizedContext } from 'koa';
import { User } from '../model/user.model';
import { LoginRepository } from '../repository/login.repository';
import { HttpStatusCodes } from '../enums';
import { UserRepository } from '../repository/user.repository';


export class LoginController {
  constructor(
    private loginRepo = new LoginRepository(),
    private userRepository = new UserRepository()) {}

  async login(ctx: ParameterizedContext<Context>, user: User): Promise<User> {
    const email = user.email;
    const password = user.password;
    ctx.status = HttpStatusCodes.Ok;
    if (!password) ctx.throw(HttpStatusCodes.NotFound, { message: 'Please enter your password' });
    const getPerson = await this.userRepository.getUserByEmailAndPassword(ctx, email, password);
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
