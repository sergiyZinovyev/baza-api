import L from '../../../common/logger';
import {IVisitorRes, Visitor, IVisitor} from '../controllers/interfaces/interface';
import db from '../../../common/db';
 
export class VisitorsModel {

  constructor(parameters?: IVisitor){
    const visitor = new Visitor();
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
 
  static getMaxRegnum(): Promise<any[]> {
    const sql: string = `SELECT MAX(regnums.max) AS max FROM ((SELECT MAX(regnum) AS max FROM visitors) UNION (SELECT MAX(regnum) AS max FROM visitors_create) UNION (SELECT MAX(regnum) AS max FROM visitors_edit)) AS regnums`;
    return db.sqlQueryPromise(sql, 'VisitorsModel.getMaxRegnum')
  }
 
  delete(table: string, id: string): Promise<any[]>{
    const sql: string = `DELETE FROM ${table} WHERE regnum IN (${id})`;
    return db.sqlQueryPromise(sql, 'VisitorsModel.delete')
  }

  get(valuesArr?: Array<any>, field?: string, table?: string): Promise<any[]> {
    const condition: string = field ? `WHERE ${field}=?` : '';
    const fromTable: string = table ? table : 'visitors';
    const select = this.select();
    const sql: string = `SELECT ${select} FROM ${fromTable} ${condition}`;
    return db.sqlQueryPromise(sql, 'VisitorsModel.get', valuesArr)
  }

  validcontact(fild: string, valuesArr: Array<any>): Promise<any[]>{
    const select = this.select();
    const sql: string = `(SELECT ${select} FROM visitors WHERE ${fild}=?) UNION (SELECT ${select} FROM visitors_create WHERE ${fild}=?) UNION (SELECT ${select} FROM visitors_edit WHERE ${fild}=?)`;
    return db.sqlQueryPromise(sql, 'VisitorsModel.validcontact', valuesArr)
  }

  update(valuesArr: Array<any>, table: string, regnum: number): Promise<any>{
    const set = this.select().replace(/,/g, '=?,') + '=?';
    const sql = `UPDATE ${table} SET ${set} WHERE regnum=${regnum}`;
    //console.log('sql: ', sql);
    return db.sqlQueryPromise(sql, 'VisitorsModel.update', valuesArr)
    //return Promise.resolve(db.loggerSql(sql, valuesArr)) //
  }

  insert(valuesArr: Array<any>, table: string): Promise<any>{
    const field = this.select();
    const values = this.values(field);
    const sql = `INSERT INTO ${table} (${field}) VALUES (${values})`;
    //console.log('sql: ', sql);
    return db.sqlQueryPromise(sql, 'VisitorsModel.insert', valuesArr)
    //return Promise.resolve(db.loggerSql(sql, valuesArr)) //
  }
}
 
export default VisitorsModel;