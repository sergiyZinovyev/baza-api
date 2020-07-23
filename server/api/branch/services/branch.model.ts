import db from '../../../common/db';

export class BranchModel {

  get(valuesArr?: Array<any>): Promise<any[]> {
    const sql: string = `SELECT branch FROM branches`;
    return db.sqlQueryPromise(sql, 'BranchModel.get')
  }

}
 
export default new BranchModel();