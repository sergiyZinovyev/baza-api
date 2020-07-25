export interface ICheckPwd {
  ver: boolean,
  msg: 'NO_PASSWORD' | 'VERIFIED' | 'PASSWORD_MISMATCH' | 'NO_DATA',
}

// export interface IAction {
//   name: string,
//   maskDec: number
// }

// export interface IUserRole {
//   id: number,
//   name: string,
//   actions: IAction[],
//   maskDec: number
// }

export interface IVisitor {
  regnum?: number,
  name?: string,
  prizv?: string,
  namepovne?: string,
  countryid?: number,
  postindeks?: string,
  regionid?: number,
  city?: string,
  address?: string,
  postaddreses?: string,
  telephon?: string,
  pobatkovi?: string,
  gender?: string,
  m_robotu?: string,
  sferadij?: string,
  posada?: string,
  type?: string,
  kompeten?: string,
  potvid?: string,
  email?: string,
  datawnesenny?: string,
  datelastcor?: string,
  rating?: string,
  ins_user?: number,
  cellphone?: string,
  sending?: number,
  password?: string
}
   
export interface IVisitorRes extends IVisitor {
  options?: {
    receivedTable: string,
    receivedParam: string
  }
}

export class Visitor implements IVisitor {
  regnum: number = null;
  name: string = '';
  prizv: string = '';
  namepovne: string = '';
  countryid: number = null;
  postindeks: string = '';
  regionid: number = null;
  city: string = '';
  address: string = '';
  postaddreses: string = '';
  telephon: string = '';
  pobatkovi: string = '';
  gender: string = '';
  m_robotu: string = '';
  sferadij: string = '';
  posada: string = '';
  type: string = '';
  kompeten: string = '';
  potvid: string = '';
  email: string = '';
  datawnesenny: string = '';
  datelastcor: string = '';
  rating: string = '';
  ins_user: number = null;
  cellphone: string = '';
  sending: number = null;
  password: string = '';

  constructor(parameters?: IVisitor) {
    if(parameters){
      for (let key in parameters){
        this[key] = parameters[key]
      }
    }
  }

  public keysToString(){
    return Object.getOwnPropertyNames(this).join(', ')
  }
} 

