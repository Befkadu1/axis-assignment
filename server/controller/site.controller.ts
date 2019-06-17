import { Context, ParameterizedContext } from 'koa';
import { HttpStatusCodes } from '../enums';
import { SiteRepository } from '../repository/site.repository';
import { Site } from '../model/site.model';


export class SiteController {
  constructor(
    private siteRepo = new SiteRepository(),
  ) {}
  async getAll(ctx: ParameterizedContext<Context>): Promise<Site[]> {
    ctx.status = HttpStatusCodes.Ok;
    const sites = await this.siteRepo.getAll();
    if (!sites) {
       ctx.throw(HttpStatusCodes.NotFound, { message: 'No Site found' });
    }
    return sites;
  }

}