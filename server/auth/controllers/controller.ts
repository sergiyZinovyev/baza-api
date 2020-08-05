import AuthService from '../services/auth.service';
import { Request, Response, NextFunction} from 'express';
import {IRequest} from '../../common/interfaces';

class Controller {
  
  getAccess(req: IRequest, res: Response, next: NextFunction): void {
    const password: string = req.query.password as string;
    const login: string = req.query.login as string;
    if (!login) {
      req.access = {accessLevel: 0, msg: 'NO_DATA_VERIFICATION', idUser: 99}
      return next()
    }
    AuthService.getAccsses(login, password)
      .then((result: any) => {
        req.access = result;
        return next();
      })
      .catch(err => res.status(404).send(JSON.stringify(err)));
     
  }
      
  checkAccess(accessLevels: Array<number> = [0,1,2,3,4,5,6,7]){ 
    return (req: IRequest, res: Response, next: NextFunction): void => {
      const access: IRequest['access'] = req.access;
      if (!accessLevels.includes(access.accessLevel)) res.status(403).send(JSON.stringify("You do not have permission to execute this request"))
      else next();
    }
  }
}

export default new Controller();
