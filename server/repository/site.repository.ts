import { Site } from "../model/site.model";

var sqlite3 = require('sqlite3').verbose(); // create a Database object:
let db = new sqlite3.Database('./db.sqlite');

export class SiteRepository {
  constructor() {}
  async getAll(): Promise<Site[]> {
    
    // sites table joined with devices, to get the Site name (Axis Lund or Axis Linköping)
    let query = `SELECT * FROM sites`;
   
    return new Promise(function(resolve, reject) {
      db.all(query, function (err, rows) {
        if(err) reject('No Sites found: ' + err.message);
        rows.map(row => {
          return row;
        });
        resolve(rows)
      })
    }) 
  }

  async getSiteIdsByUserEmail(email: string): Promise<any> {
    let query = `SELECT sites_id FROM users JOIN sites_users ON users.id = sites_users.users_id AND users.email = "${email}"`;

    return new Promise(function(resolve, reject) {
      db.all(query, function (err, rows) {
        if(err) reject("Error when looking for Site" + err.message)
        resolve(rows);
      })
    }) 
  }
}