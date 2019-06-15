import { User } from "../model/user.model";
import { generateToken } from "../config/token-generator";
var sqlite3 = require('sqlite3').verbose(); // create a Database object:
let db = new sqlite3.Database('./db.sqlite');

export class LoginRepository {

  constructor() {}

  async updateToken(person: User): Promise<Partial<User>> {
    let token = generateToken(person);

    let dataT = [token, person.email];
    let sql = `UPDATE users SET token = ? WHERE email = ?`;
    return new Promise(function(resolve, reject) {
      db.run(sql, dataT, function(err) {
        if (err) {
          reject('Token not updated:' + err.message);
        }

        const Person = {
          email:  person.email,
          token
        }
        console.log(`Row(s) updated: ${this.changes}`);
        resolve(Person)
      });
     }) 
  }
}