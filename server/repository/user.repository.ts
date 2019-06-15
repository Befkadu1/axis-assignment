import { User } from '../model/user.model';
import { generateToken } from '../config/token-generator';
var sqlite3 = require('sqlite3').verbose(); // create a Database object:
let db = new sqlite3.Database('./db.sqlite');
import * as uuid from 'uuid';

export class UserRepository {

  async create(user: User): Promise<User> {
    
    const { email, password } = user;
    const id = uuid();
    const token = generateToken(user);
    const person = await this.getByEmailAndPassword(email, password);
     
    if (person) {
      console.log('The user already  exists in the db')
      return ;
    }
    const query = `INSERT INTO users (id, email, password, token) VALUES (?, ?, ?, ?)`;
    const data = [id, email, password, token];
    return new Promise(function(resolve, reject) {
        db.run(query, data,
        function(err, row) {
          if (err) { reject("Read error: " + err.message) }
          resolve(row); // nothing will be returned
        });
     });
 
  }

  async getByEmailAndPassword(email, password): Promise<User> {
    let query = `SELECT * FROM users WHERE (email = "${email}" AND password = "${password}")`;
    return new Promise(function(resolve, reject) {
        db.all(query, function (err, rows) {
            if(err) reject("Read error: " + err.message)
            else {
              if (rows.length === 0) { resolve(null);}
              rows.forEach(async function (row) {
                if(row.email == email && row.password == password) {
                  resolve(row);
                } else {
                  reject("Person not found: " + err.message)
                }
              })
            }
        })
    }) 
  }

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

  async getSiteIdByEmail(email: string) {
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
