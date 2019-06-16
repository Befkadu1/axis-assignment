import { Context, ParameterizedContext } from 'koa';
import { Device } from '../model/device.model';
import { DeviceRepository } from '../repository/device.repository';
import { HttpStatusCodes } from '../enums';
import { UserRepository } from '../repository/user.repository';


export class DeviceController {
  constructor(
    private deviceRepo = new DeviceRepository(),
    private userRepository = new UserRepository()
  ) {}
  async getAll(ctx:  ParameterizedContext<Context>, email: string): Promise<Device[]> {
    ctx.status = HttpStatusCodes.Ok;
    const sites: [{sites_id: string}] = await this.userRepository.getSitesByUserEmail(email);
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
