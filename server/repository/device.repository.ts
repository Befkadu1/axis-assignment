import { Device } from "../model/device.model";
import { UserRepository } from "./user.repository";
import { HttpStatusCodes } from "../enums";

var sqlite3 = require('sqlite3').verbose(); // create a Database object:
let db = new sqlite3.Database('./db.sqlite');

export class DeviceRepository {
  constructor(private userRepository = new UserRepository()) {}
  async getAll(email: string): Promise<Device> {
     const sites= await this.userRepository.getSiteIdByEmail(email);
     if (!sites) {
        console.log(HttpStatusCodes.NotFound, {
        message: 'sites not found',
      });
     }
    
    // sites table joined with devices, to get the Site name (Axis Lund and Axis Linköping)
    let query = `SELECT sites.name as site, devices.id, devices.name, model, firmware FROM sites INNER JOIN devices ON sites.id = devices.sites_id WHERE (sites_id = "${sites['sites_id']}")`;
   
    return new Promise(function(resolve, reject) {
      db.all(query, function (err, rows) {
        if(err) reject("Read error: " + err.message);
        rows.map(row => {
          row['type'] = 'device';  // adding the type property for all devices
          return row;
        });
        resolve(rows)
      })
    }) 
  }
}