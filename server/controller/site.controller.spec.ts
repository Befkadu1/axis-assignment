import { describe, it } from 'mocha';
import { Context } from 'koa';
import { expect } from 'chai';
import { HttpStatusCodes } from '../enums';
import { SiteController } from './site.controller';
import { Site } from '../model/site.model';

 const ctx: Context = <Context>{
    status: HttpStatusCodes.Ok,
    throw: () => {},
  };

describe('site controller', () => {

  const siteController = new SiteController();
  const expectedSite: Site[] = [ 
    { 
      id: '5f46aecf-fd72-44ad-8f34-412a85d7ac93',
      name: 'Axis Lund' 
    },
    { id: 'ceaa041d-65b2-4884-9323-cf4c89df5930',
      name: 'Axis Linköping' 
    } 
  ]
  it('should get all sites', async () => {

    const actualSite = await siteController.getAll(ctx);
    expect(actualSite.toString()).to.equal(expectedSite.toString()); // Array comparision

  })

})