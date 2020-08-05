import AuthModel from './auth.model';
import {IRequest} from '../../../common/interfaces'

class AuthService {

  
  private getUser(login: string): Promise<any[]>{
    return AuthModel.getUser([login])
  }

  getAccsses(login: string, password: string): Promise<any>{
    let access = {accessLevel: 0, id: 99, msg: 'OK'}
    let sqlData: any[];
    return new Promise((resolve, reject) => {
      this.getUser(login)
        .then((data: any[])=>{ 
      
          if (!data[0]) access.msg = 'NO_USER'
          else if(data[0].passw == password) {
            access.accessLevel = data[0].insupdvisitors ?? 0;
            access.id = data[0].id;
            access['name'] = data[0].name;
            access['passw'] = data[0].passw;
            access['realname'] = data[0].realname;
          }
          else access.msg = 'PASSWORD_MISMATCH'
          return resolve(access)
        })
        .catch(err => reject(err));
    })
  }

 
}
 
export default new AuthService();