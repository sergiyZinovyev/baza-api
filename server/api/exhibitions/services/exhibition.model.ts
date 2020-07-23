import {IExhibition, Exhibition} from '../controllers/interfaces/interface';
import db from '../../../common/db';

export class ExhibitionsModel {

  constructor(parameters?: IExhibition){
    const exhibition = new Exhibition();
    if(parameters){
      for (let key in parameters){
        if(exhibition.hasOwnProperty(key)) this[key] = parameters[key];
      }
    } else {
      for (let key in exhibition) {
        this[key] = exhibition[key]; 
      };
    }
  }
   
  private select(): string{
    const propName: string = Object.getOwnPropertyNames(this).join(', ');
    return propName !== '' ? propName : '*'; 
  }

  getAll(valuesArr?: Array<any>): Promise<any[]>{
    const select = this.select();
    const sql: string = `SELECT ${select} FROM exhibitions`;
    return db.sqlQueryPromise(sql, 'ExhibitionsModel.getAll', valuesArr)
  }

  getByDate(valuesArr: Array<any>): Promise<any[]>{
    const select = this.select();
    const sql: string = `SELECT ${select} FROM exhibitions WHERE dateend>=?`;
    return db.sqlQueryPromise(sql, 'ExhibitionsModel.getByDate', valuesArr)
  }
 
  getById(valuesArr: Array<any>): Promise<any[]>{
    const select = this.select();
    const sql: string = `SELECT ${select} FROM exhibitions WHERE numexhib=?`;
    return db.sqlQueryPromise(sql, 'ExhibitionsModel.getById', valuesArr)
  }

}
 
export default ExhibitionsModel;