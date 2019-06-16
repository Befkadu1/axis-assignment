import { Device } from "../model/device.model";
var sqlite3 = require('sqlite3').verbose(); // create a Database object:
let db = new sqlite3.Database('./db.sqlite');

export class DeviceRepository {
  constructor() {}
  async getAll(sites_id: string): Promise<Device[]> {
    
    // sites table joined with devices, to get the Site name (Axis Lund or Axis Linköping)
    let query = `SELECT sites.name as site, devices.id, devices.name, model, firmware, type FROM sites INNER JOIN devices ON sites.id = devices.sites_id WHERE (sites_id = "${sites_id}")`;
    return new Promise(function(resolve, reject) {
      db.all(query, function (err, rows) {
        if(err) reject('No Sites found: ' + err.message);
        resolve(rows)
      })
    }) 
  }
}