import Regions from '../services/regions';
import { Request, Response } from 'express';
import {IRequest} from '../../../common/interfaces';
import L from '../../../common/logger';
import { IRegionReqQuery, IRegionRes, RegionReqQuery } from './interfaces/interface';

export class Controller {

  regions(req: IRequest, res: Response): void {
    const query = new RegionReqQuery(req.query);
    let promise: Promise<IRegionRes[]>;
    if (query.countryid > 0 && query.regionid > 0) promise = Regions.cities(query.keysValueToArr());
    else if (query.countryid > 0) promise = Regions.regions(query.keysValueToArr());
    else promise = Regions.countries();
    promise
      .then((r: IRegionRes[]) => res.json(r))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }

}
export default new Controller();
