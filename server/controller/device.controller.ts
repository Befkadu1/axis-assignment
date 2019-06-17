import { Context, ParameterizedContext } from 'koa';
import { Device } from '../model/device.model';
import { DeviceRepository } from '../repository/device.repository';
import { HttpStatusCodes } from '../enums';
import { SiteRepository } from '../repository/site.repository';


export class DeviceController {
  constructor(
    private deviceRepo = new DeviceRepository(),
    private siteRepository = new SiteRepository()
  ) {}
  async getAll(ctx:  ParameterizedContext<Context>, email: string): Promise<Device[]> {
    ctx.status = HttpStatusCodes.Ok;
    const sites: [{sites_id: string}] = await this.siteRepository.getSiteIdsByUserEmail(email);
    if (!sites) ctx.throw(HttpStatusCodes.NotFound, { message: 'No Site found' });
    const devices = await this.devicesFromDB(sites);
    return devices;
  }

  async devicesFromDB(sites: [{sites_id: string}]): Promise<Device[]> {
    let devices: Device[] = [];
    let allDevices = await Promise.all(sites.map(async(site) => { 
      const device: Device[] = await this.deviceRepo.getAll(site.sites_id);
      devices.push( ...device);
      return devices;
    }))
    return allDevices[0];
  }


}
