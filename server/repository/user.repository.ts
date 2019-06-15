import { User } from '../model/user.model';
import { generateToken } from '../config/token-generator';
var sqlite3 = require('sqlite3').verbose(); // create a Database object:
let db = new sqlite3.Database('./db.sqlite');
import * as uuid from 'uuid';
import { ParameterizedContext, Context } from 'koa';
import { HttpStatusCodes } from '../enums';

export class UserRepository {

  async create(ctx: ParameterizedContext<Context>, user: User): Promise<User> {  
    const { email, password } = user;
    const id = uuid();
    const token = generateToken(user);
    const person = await this.getByEmailAndPassword(ctx, email, password);
     
      // if person exists the user is already in the db results a person will not be created in db
    if (person) ctx.throw(HttpStatusCodes.Conflict, { message: 'The user already exists in the db' });

    // if person (person = null) doesn't exist, the person will be created in db
    const query = `INSERT INTO users (id, email, password, token) VALUES (?, ?, ?, ?)`;
    const data = [id, email, password, token];
    return new Promise(function(resolve) {
        db.run(query, data, function(err, row) {
          if (err) { 
            ctx.throw(HttpStatusCodes.InternalServerError, { message: err.message });
          }
          resolve(row);
        });
     });
 
  }

  async getByEmailAndPassword(ctx: ParameterizedContext<Context>, email: string, password: string): Promise<User> {
    let query = `SELECT * FROM users WHERE (email = "${email}" AND password = "${password}")`;
    return new Promise(function(resolve, reject) {
        db.all(query, function (err, rows) {
          if (rows.length === 0) { resolve(null);} // if user not found, returns null
          rows.forEach(async function (row) {
            if(row.email == email && row.password == password) {
              resolve(row);
            } else {
              reject(ctx.throw(HttpStatusCodes.InternalServerError, { message: err.message }));
            }
          })
        })
    }) 
  }

  async getSiteIdByUserEmail(email: string) {
    let query = `SELECT sites_id FROM users INNER JOIN sites_users ON id = users_id WHERE (email = "${email}")`;
    return new Promise(function(resolve, reject) {
      db.all(query, function (err, rows) {
        if(err) reject("Error when looking for Site" + err.message)
        else {
          if (rows.length === 0) {
            resolve (rows)
          }
          rows.forEach(async function (row) {
            resolve(row);
          })
        }
      })
    }) 
  }
}
