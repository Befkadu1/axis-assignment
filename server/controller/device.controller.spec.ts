import { describe, it } from 'mocha';
import { DeviceController } from './device.controller';
const chai = require('chai')
const expect = chai.expect
import { Context } from 'koa';
import { HttpStatusCodes } from '../enums';

 const ctx: Context = <Context>{
    status: HttpStatusCodes.Ok,
    throw: () => {},
  };
  
describe('device controller', () => {

  const deviceController = new DeviceController();
  it('should be able to get all the devices for a specific site', async () => {
   
    const email = 'test@axis.com';
    const devices = await deviceController.getAll(ctx, email);
    expect(devices.length).to.equal(7)
    expect(devices[0]).to.have.property('id')
    expect(devices[0]).to.have.property('type')
    expect(devices[0]).to.have.property('model')
    expect(devices[0]).to.have.property('firmware')
    expect(devices[0]).to.have.property('site')

    expect(devices[0]['type']).to.equal('device')
    expect(devices[0].id).to.be.a('string')
    expect(devices[0].model).to.be.a('string')
    expect(devices[0].firmware).to.be.a('string')

  })
})