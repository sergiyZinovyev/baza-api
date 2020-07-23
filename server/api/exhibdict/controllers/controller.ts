import { Request, Response } from 'express';
//import {IRequest} from '../../../common/interfaces';
import Service from '../services/service'

 
export class Controller {
  
  get(req: Request, res: Response): void {
    Service.get()
      .then((r: any) => res.json(r))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }

  getNameByGroup(req: Request, res: Response): void {
    Service.getNameByGroup(Number(req.query.id))
      .then((r: any) => res.json(r))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }
 
}
export default new Controller();
