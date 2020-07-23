import db from '../../common/db';

class AuthModel {

  getUser(valuesArr?: Array<any>): Promise<any[]> {
    const sql: string = `SELECT * FROM usersaccount WHERE name=?`;
    return db.sqlQueryPromise(sql, 'AuthModel.getUser', valuesArr)
  }

}
 
export default new AuthModel();