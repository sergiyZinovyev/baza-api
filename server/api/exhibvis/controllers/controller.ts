import Service from '../services/exhibvis.service';
import Email from '../services/exhibvis.email';
import VisitorsService from '../../visitors/services/visitors.service';
import { Request, Response} from 'express';
import {IRequest} from '../../../common/interfaces';
import {IExhibvis} from './interfaces/interface';

class Controller {

  getVisitorOfExhib(req: Request, res: Response): void{
    Service.getVisitorOfExhib(Number(req.query.idVis), Number(req.query.exhib))
      .then((data: IExhibvis[]) => res.send(data))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }

  create(req: IRequest, res: Response): void{
    VisitorsService.getVisitor({ email: '', cellphone: '', regnum: req.body.id_visitor})
      .then(visitor => {
        if (visitor || [1,3,4,5].includes(req.access.accessLevel)) return Service.createVisitor(req.body, req.access.idUser, visitor.datawnesenny)
        else throw("You do not have permission to execute this request")
      })
      .then((data: string) => res.send(JSON.stringify(data)))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }
 
  sendInvite(req: IRequest, res: Response): void{
    Email.sendInvite(req.body)
      .then((data: string) => res.send(JSON.stringify(data)))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }  
  
}

export default new Controller();
