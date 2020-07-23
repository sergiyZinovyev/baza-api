export interface IEmailOpt {
  file: any;
  prizv: string;
  name: string;
  pobatkovi: string;
  regnum: number;
  email: string
} 
 
export interface IExhibvis {
  id_vis: number;
  id_exhibition: number;
  id_visitor: number;
  registered: number;
  visited: number;
  date_vis: string; 
  date_reg: string;
  fake_id: number;
  reg_user: number;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  new_visitor: string
}
  

export class Exhibvis implements IExhibvis {
  id_vis: number = null;
  id_exhibition: number = null;
  id_visitor: number = null;
  registered: number = null;
  visited: number = null;
  date_vis: string = ''; 
  date_reg: string = '';
  fake_id: number = null;
  reg_user: number = null;
  referrer: string = '';
  utm_source: string = '';
  utm_medium: string = '';
  utm_campaign: string = '';
  utm_term: string = '';
  utm_content: string = '';
  new_visitor: string = ''

  constructor(parameters?: IExhibvis) {
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

