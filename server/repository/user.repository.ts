import { User } from '../model/user.model';
var sqlite3 = require('sqlite3').verbose(); // create a Database object:
let db = new sqlite3.Database('./db.sqlite');
import { ParameterizedContext, Context } from 'koa';
import { HttpStatusCodes } from '../enums';

export class UserRepository {

  async create(ctx: ParameterizedContext<Context>, user: User): Promise<User> {  
    const { email, password, id } = user;

    // if person (person = null) doesn't exist, the person will be created in db
    const query = `INSERT INTO users (id, email, password) VALUES (?, ?, ?)`;
    const data = [id, email, password];
    return new Promise(function(resolve, reject) {
        db.run(query, data, function(err) {
          if (err) { 
            reject(ctx.throw(HttpStatusCodes.InternalServerError, { message: err.message }));
          }
          const person = {
            id,
            email,
          }

          resolve(person);
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

  async getSitesByUserEmail(email: string): Promise<any> {
    let query = `SELECT sites_id FROM users INNER JOIN sites_users ON users.id = sites_users.users_id AND users.email = "${email}" INNER JOIN sites ON sites_users.sites_id = sites.id`;
    return new Promise(function(resolve, reject) {
      db.all(query, function (err, rows) {
        if(err) reject("Error when looking for Site" + err.message)
        resolve(rows);
      })
    }) 
  }
}
