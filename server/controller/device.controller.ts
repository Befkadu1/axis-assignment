import { Context, ParameterizedContext } from 'koa';
import { Device } from '../model/device.model';
import { DeviceRepository } from '../repository/device.repository';
import { HttpStatusCodes } from '../enums';


export class DeviceController {
  constructor(private deviceRepo = new DeviceRepository()) {}
  async getAll(ctx:  ParameterizedContext<Context>, email: string,): Promise<Device> {
    ctx.status = HttpStatusCodes.Ok;
    return await this.deviceRepo.getAll(email);
  }


}
