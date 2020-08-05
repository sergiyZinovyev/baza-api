import AuthModel from './auth.model';
import {IRequest} from '../../common/interfaces'

class AuthService {

  
  private getUser(login: string): Promise<any[]>{
    return AuthModel.getUser([login])
  }

  getAccsses(login: string, password: string): Promise<any>{
    let access: IRequest['access'] = {accessLevel: 0, idUser: 99}
    let sqlData: any[];
    // return new Promise((resolve, reject) => {
    //   this.getUser(login)
    //     .then((data: any[])=>{
    //       sqlData = data;
    //       if (!sqlData[0]) return 'NO_USER'
    //       else if(sqlData[0].passw == password) return 'OK'
    //       else return 'PASSWORD_MISMATCH'
    //     })
    //     .then(pCheck=>{
    //       if (pCheck === 'NO_USER' || pCheck === 'PASSWORD_MISMATCH') return pCheck;
    //       return sqlData[0].insupdvisitors ?? 0
    //     })
    //     .then(result => resolve(result))
    //     .catch(err => reject(err));
    // })

    return new Promise((resolve, reject) => {
      this.getUser(login)
        .then((data: any[])=>{ 
      
          if (!data[0]) access.msg = 'NO_USER'
          else if(data[0].passw == password) {
            access.accessLevel = data[0].insupdvisitors ?? 0;
            access.idUser = data[0].id
          }
          else access.msg = 'PASSWORD_MISMATCH'
          return resolve(access)
        })
        // .then(pCheck=>{
        //   if (pCheck === 'NO_USER' || pCheck === 'PASSWORD_MISMATCH') return pCheck;
        //   return sqlData[0].insupdvisitors ?? 0
        // })
        // .then(result => resolve(result))
        .catch(err => reject(err));
    })
  }

 
}
 
export default new AuthService();