import VisitorsService from '../services/visitors.service';
import VisitorsAuth from '../services/visitors.auth';
import { Request, Response} from 'express';
import {IRequest} from '../../../common/interfaces';
import {IVisitorRes, ICheckPwd} from './interfaces/interface';

class Controller {

  get(req: IRequest, res: Response): void{
    let model: IVisitorRes;
    VisitorsService.getVisitor(req.body)
      .then((r: IVisitorRes): Promise<ICheckPwd> => {
        model = r;
        if(!model) return Promise.resolve({ver: false, msg: 'NO_DATA'});
        return VisitorsAuth.checkWritePermissions(req.access.accessLevel, model.password, req.body.password, model.options.receivedTable, 'read')
          .then((checkWritePermissions: boolean): ICheckPwd => {
            if(checkWritePermissions) return {ver: true, msg: 'VERIFIED'};
            return {ver: false, msg: 'PASSWORD_MISMATCH'}
          })
      })
      .then((checkPwdObj: ICheckPwd) => {
        if (checkPwdObj.ver) res.send(model)
        else res.send(JSON.stringify(checkPwdObj.msg))
      })
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }

  edit(req: IRequest, res: Response): void{
    let model: IVisitorRes;
    req.body['ins_user'] = req.access.idUser;
    //console.log("req.access: ",req.access);
    VisitorsService.getVisitor({ email: '', cellphone: '', regnum: req.body.regnum})
      .then((r: IVisitorRes): Promise<boolean> => {
        model = r;
        //console.log('table: ', model.options.receivedTable);
        if(!r) throw ('NO_DATA');
        return VisitorsAuth.checkWritePermissions(req.access.accessLevel, model.password, req.body.password, 'visitors', 'write')
      })
      .then((checkWritePermissionsVisitors: boolean) => {
        if (checkWritePermissionsVisitors) return  VisitorsService.editVisitor(req.body, 'visitors', model);
        return VisitorsAuth.checkWritePermissions(req.access.accessLevel, model.password, req.body.password, 'visitors_edit', 'write')
          .then((checkWritePermissionsVisitorsEdit: boolean) => {
            if (checkWritePermissionsVisitorsEdit) return  VisitorsService.editVisitor(req.body, 'visitors_edit', model);
            else throw (`you have not permission for write in visitors_edit`)
          })
      })
      .then(editData => res.send(JSON.stringify(editData)))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }

  create(req: IRequest, res: Response): void{
    //let model: IVisitorRes;
    req.body['ins_user'] = req.access.idUser;
    //console.log("req.access: ",req.access);
    // VisitorsService.getVisitor({ email: '', cellphone: '', regnum: req.body.regnum})
    //   .then((r: IVisitorRes): Promise<boolean> => {
    //     model = r;
    //     console.log('table: ', model.options.receivedTable);
    //     if(!r) throw ('NO_DATA');
    //     return VisitorsAuth.checkWritePermissions(req.access.accessLevel, model.password, req.body.password, 'visitors', 'write')
    //   })
    VisitorsAuth.checkWritePermissions(req.access.accessLevel, '', req.body.password, 'visitors', 'write')  
      .then((checkWritePermissionsVisitors: boolean) => {
        if (checkWritePermissionsVisitors) return  VisitorsService.createVisitor(req.body, 'visitors');
        return VisitorsAuth.checkWritePermissions(req.access.accessLevel, '', req.body.password, 'visitors_create', 'write')
          .then((checkWritePermissionsVisitorsEdit: boolean) => {
            if (checkWritePermissionsVisitorsEdit) return  VisitorsService.createVisitor(req.body, 'visitors_create');
            else throw (`you have not permission for write in visitors_create`)
          })
      })
      .then(createData => res.send(JSON.stringify(createData)))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }
 
  common(req: IRequest, res: Response): void {
    VisitorsService.getAll({ value: req.params.value, model: req.body.model })
      .then((r: IVisitorRes[]) => res.send(r))
      .catch(err => res.status(404).send(JSON.stringify(err)));
  }
 
  validcontact(req: IRequest, res: Response): any {
    const field = req.query.field;
    const value = req.query.value;
    const regnum = req.query.regnum;
    if(field != 'email' && field != 'cellphone') return res.sendStatus(404);
    if(!value) return res.sendStatus(204);
    let error = {};
    VisitorsService.validcontact(field, value, regnum)
      .then((r) => {
        if(r) return res.sendStatus(204);
        error[`${field}Valid`] = `такий ${field} вже використовується`;
        return res.status(200).send(JSON.stringify(error));
      })
      .catch(err => res.status(404).send(JSON.stringify(err)));
  };
 
}

export default new Controller();
