import AuthService from '../services/auth.service';
import { Request, Response, NextFunction} from 'express';

class Controller {
  
  getAccess(req: Request, res: Response): void {
    const password: string = req.body.password as string;
    const login: string = req.body.login as string;
    if (!login) res.status(400).send(JSON.stringify('NO_DATA_VERIFICATION'))
    AuthService.getAccsses(login, password)
      .then((result: any) => res.status(200).send(JSON.stringify(result)))
      .catch(err => res.status(404).send(JSON.stringify(err))); 
  }

}

export default new Controller();
