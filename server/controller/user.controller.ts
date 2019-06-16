import { Context, ParameterizedContext } from 'koa';
import { UserRepository } from '../repository/user.repository';
import { User } from '../model/user.model';
import { HttpStatusCodes } from '../enums';
import * as uuid from 'uuid';

export class UserController {
  constructor(private userRepository = new UserRepository()) {}

  async create( ctx: ParameterizedContext<Context>, user: User): Promise<User> {
    ctx.status = HttpStatusCodes.Created;
    const id = uuid();
    const { email, password } = user;
    user.id = id;
    const person = await this.userRepository.getByEmailAndPassword(ctx, email, password);
     
      // if person exists the user is already in the db results a person will not be created in db
    if (person){
      return ctx.throw(HttpStatusCodes.Conflict, { message: 'The user already exists in the db' });
    }

    return this.userRepository.create(ctx, user);
  }

}
