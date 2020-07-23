//import {IVisitorRes, ICheckPwd} from '../controllers/interfaces/interface';


export const actions = {
  visitors__read: 32,
  visitors__write: 16,	
  visitors_edit__read: 8,	
  visitors_edit__write: 4,
  visitors_create__read: 2,
  visitors_create__write: 1
} 

interface IUserRole {
  id: number,
  name: string,
  maskDec: number
}

class UserRole implements IUserRole {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly maskDec: number,
  ) {}
}

class VisitorsAuth {
  
  private readonly client = new UserRole(0, 'client', 0);
  private readonly client_pwd = new UserRole(10, 'client_pwd', actions.visitors__read | actions.visitors_edit__read | actions.visitors_edit__write | actions.visitors_create__read | actions.visitors_create__write);
  private readonly registrar = new UserRole(1, 'registrar', actions.visitors__read | actions.visitors_edit__read | actions.visitors_create__read);
  private readonly registrar_pwd = new UserRole(11, 'registrar_pwd', actions.visitors__read | actions.visitors_edit__read | actions.visitors_edit__write | actions.visitors_create__read | actions.visitors_create__write);
  private readonly user = new UserRole(2, 'user', actions.visitors__read | actions.visitors_edit__read | actions.visitors_create__read);
  private readonly user_pwd = new UserRole(12, 'user_pwd', actions.visitors__read | actions.visitors_edit__read | actions.visitors_edit__write | actions.visitors_create__read | actions.visitors_create__write);
  private readonly redactor = new UserRole(3, 'redactor', actions.visitors__read | actions.visitors_edit__read | actions.visitors_create__read);
  private readonly redactor_pwd = new UserRole(13, 'redactor_pwd', actions.visitors__read | actions.visitors__write | actions.visitors_edit__read | actions.visitors_edit__write | actions.visitors_create__read | actions.visitors_create__write);
  private readonly admin = new UserRole(4, 'admin', actions.visitors__read | actions.visitors__write | actions.visitors_edit__read | actions.visitors_edit__write | actions.visitors_create__read | actions.visitors_create__write);
  private readonly admin_pwd = new UserRole(14, 'admin_pwd', actions.visitors__read | actions.visitors__write | actions.visitors_edit__read | actions.visitors_edit__write | actions.visitors_create__read | actions.visitors_create__write);
  private readonly demiurg = new UserRole(5, 'demiurge', actions.visitors__read | actions.visitors__write | actions.visitors_edit__read | actions.visitors_edit__write | actions.visitors_create__read | actions.visitors_create__write);
  private readonly demiurg_pwd = new UserRole(15, 'demiurge_pwd', actions.visitors__read | actions.visitors__write | actions.visitors_edit__read | actions.visitors_edit__write | actions.visitors_create__read | actions.visitors_create__write);

  private getRole(accessLevel: number, currentPwd?: string, pwd?: string): UserRole {
    let role: UserRole;
    if (!currentPwd || currentPwd === pwd) accessLevel = accessLevel + 10;
    Object.getOwnPropertyNames(this).forEach((key: string) => {
      if(accessLevel === this[key].id) role = this[key]
    })
    return role
  }

  checkWritePermissions(accessLevel: number, currentPwd: string, pwd: string, table: string, rights: 'write'|'read'): Promise<boolean>{
    const userRolesMask = this.getRole(accessLevel, currentPwd, pwd).maskDec;
    const actionsMask = actions[table + '__' + rights];
    let result = (userRolesMask & actionsMask) > 0 ? true : false
    return Promise.resolve(result)
  }

  // checkPwd(currentPwd: string, pwd: string, accessLevels: Array<number>, accessLevel?: any): Promise<ICheckPwd> {
  //   let result: ICheckPwd = {ver: true, msg: 'VERIFIED_USER'};
  //   switch (true) {
  //     case typeof accessLevel === "number" && accessLevels.includes(accessLevel): return Promise.resolve(result);
  //     case !currentPwd: 
  //       result.ver = true;
  //       result.msg = 'NO_PASSWORD';
  //       break;
  //     case currentPwd === pwd: 
  //       result.msg = 'VERIFIED_CLIENT'; 
  //       break;
  //     default:
  //       result.ver = false;
  //       result.msg = 'PASSWORD_MISMATCH';
  //       break;
  //   }
  //   return Promise.resolve(result)
  // }

  
 
}
 
export default new VisitorsAuth();