import { Request, Response } from 'express';
import {IRequest} from '../../../common/interfaces';
import Service from '../services/branch.service'


export class Controller {
 
  get(req: IRequest, res: Response): void {
    Service.get()
      .then((r: any) => res.json(r))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }
 
}
export default new Controller();
