import {Exhibvis, IExhibvis} from '../controllers/interfaces/interface';
import db from '../../../common/db';
 
export class Model {

  constructor(parameters?: IExhibvis){
    const visitor = new Exhibvis();
    if(parameters){
      for (let key in parameters){
        if(visitor.hasOwnProperty(key)) this[key] = parameters[key];
      }
    } else {
      for (let key in visitor) {
        this[key] = visitor[key];
      };
    }
  }
 
  private select(): string{
    const propName: string = Object.getOwnPropertyNames(this).join(', ');
    return propName !== '' ? propName : '*'; 
  }

  private values(field: string): string {
    let values: string = '';
    for (let i = 0; i < field.split(', ').length-1; i++) {values += '?,'};
    return values += '?';
  }
 
  static getVisitorOfExhib(valuesArr?: Array<any>): Promise<IExhibvis[]> {
    const sql: string = `SELECT * FROM exhibition_vis WHERE (id_visitor=? AND id_exhibition=?)`;
    return db.sqlQueryPromise(sql, 'ExhibvisModel.getVisitorOfExhib', valuesArr)
  }
 
  insert(valuesArr: Array<any>): Promise<any>{
    const field = this.select();
    const values = this.values(field);
    const sql = `INSERT INTO exhibition_vis (${field}) VALUES (${values})`;
    return db.sqlQueryPromise(sql, 'ExhibvisModel.insert', valuesArr)
  }
}
 
export default Model;