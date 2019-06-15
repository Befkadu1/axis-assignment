import { Context, ParameterizedContext } from 'koa';
import { UserRepository } from '../repository/user.repository';
import { User } from '../model/user.model';
import { HttpStatusCodes } from '../enums';


export class UserController {
  constructor(private userRepository = new UserRepository()) {}

  async create( ctx: ParameterizedContext<Context>, values: User): Promise<User> {
    ctx.status = HttpStatusCodes.NoContent;
    return this.userRepository.create(values);
  }

}
