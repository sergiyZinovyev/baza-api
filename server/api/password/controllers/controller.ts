import Service from '../services/password.service';
import VisitorService from '../../visitors/services/visitors.service';
import Email from '../services/password.email';
import {Request, Response} from 'express';


class Controller {

  change(req: Request, res: Response): void{
    Service.checkVisitorsPassword(req.body.regnum, req.body.firstpassword)
      .then(result => {
        if (result) return Service.addPassword(req.body.regnum, req.body.password, req.body.firstpassword)
        else throw 'PASSWORD_MISMATCH'
      })
      .then(data => Email.sendPasswordToEmail(data, req.body.email))
      .then(data => res.send(JSON.stringify(data)))
      .catch(err => {
        console.log(err);
        res.status(400).send(JSON.stringify(err));
      });
  }

  set(req: Request, res: Response): void{
    Service.checkFirstpassword(Number(req.query.regnum), String(req.query.firstpassword))
      .then(data => {
        if(data === 'EDIT') return Service.editPassword(Number(req.query.regnum), String(req.query.password))
        else return data
      })
      .then(data => {
        if(data === 'DONE') return Service.delRowInPasswords(Number(req.query.regnum))
        else return data
      })
      .then(data => res.send(JSON.stringify(data)))
      .catch(err => {
        console.log(err);
        res.status(400).send(JSON.stringify(err));
      });
  }
 
  reset(req: Request, res: Response): void{
    let visitorData: Object;
    VisitorService.getVisitor(req.body)
      .then(getVisitorData => {
        visitorData = getVisitorData;
        if (!visitorData || !visitorData['email']) throw {resetpassError: 'email not found'};
        return Service.addPassword(visitorData['regnum'], '', visitorData['password'])
      })
      .then(data => Email.sendPasswordToEmail(data, visitorData['email']))
      .then(data => res.send(JSON.stringify(data)))
      .catch(err => {
        console.log(err);
        res.status(400).send(JSON.stringify(err));
      });
  }

  
}

export default new Controller();
