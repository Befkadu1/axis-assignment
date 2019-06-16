import { describe, it } from 'mocha';
import { User } from '../model/user.model';
import { Context } from 'koa';
import { UserController } from './user.controller';
import { expect } from 'chai';
import { HttpStatusCodes } from '../enums';

 const ctx: Context = <Context>{
    status: HttpStatusCodes.Created,
    throw: () => {},
  };

describe('user controller', () => {

  const userController = new UserController();
  const user: User = {
    email: 'test1@axis.com',
    password: 'test'
  }
  it('should be able to create a user', async () => {

    const person = await userController.create(ctx, user);

    expect(person.id).to.be.a('string')
    expect(person).to.have.property('id');
    expect(person.email).to.equal(user.email);
  })

  it('should not be able to create a user if the user exists in the db', async () => {

    const person = await userController.create(ctx, user);   
     expect(person).to.equal(undefined)
  })
})