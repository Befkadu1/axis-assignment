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
  async getAll(ctx:  ParameterizedContext<Context>, email: string,): Promise<Device> {
    ctx.status = HttpStatusCodes.Ok;
    const sites= await this.userRepository.getSiteIdByUserEmail(email);
    if (!sites) ctx.throw(HttpStatusCodes.NotFound, { message: 'No Sites found' });
    return await this.deviceRepo.getAll(sites['sites_id']);
  }


}
