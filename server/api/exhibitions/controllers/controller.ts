import ExhibitionService from '../services/exhibition.service';
import { Request, Response } from 'express';
import {IRequest} from '../../../common/interfaces';
import {IExhibition} from './interfaces/interface';
 
class Controller {
 
  get(req: IRequest, res: Response): void {
    let promise: Promise<IExhibition[]>;
    if(!req.query.date && !req.query.id) promise = ExhibitionService.getAll();
    if(req.query.date) {
      req.query.id = undefined;
      promise = ExhibitionService.getByDate(req.query.date)
    };
    if(req.query.id) promise = ExhibitionService.getById(req.query.id);
    promise
      .then((r: IExhibition[]) => res.send(r))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }
  
}
 
export default new Controller();
