import db from '../../../common/db';
  
class Model {

  getRegnumInPasswords(regnum: number): Promise<Array<number>>{
    const sql = `SELECT * FROM passwords WHERE regnum=${regnum}`;
    return db.sqlQueryPromise(sql, 'PasswordModel.checkRegnumInPasswords')
  }

  editRowInPasswords(valuesArr?: Array<any>): Promise<any>{
    const sql = `UPDATE passwords SET password=?, firstpassword=? WHERE regnum=?`;
    return db.sqlQueryPromise(sql, 'PasswordModel.editRowInPasswords', valuesArr)
  }

  createRowInPasswords(valuesArr?: Array<any>): Promise<any>{
    const sql = `INSERT passwords(regnum, password, firstpassword) VALUES (?,?,?)`;
    return db.sqlQueryPromise(sql, 'PasswordModel.createRowInPasswords', valuesArr)
  }
 
  checkVisitorsPassword(regnum: number, password: string): Promise<Array<number>>{
    const sql = ` SELECT 
                    regnum
                  FROM 
                    visitors
                  WHERE 
                    regnum = ${regnum} 
                    AND password = '${password}' 
                  UNION 
                  SELECT 
                    regnum
                  FROM 
                    visitors_edit
                  WHERE 
                    regnum = ${regnum} 
                    AND password = '${password}' 
                  UNION
                  SELECT 
                    regnum
                  FROM 
                    visitors_create
                  WHERE 
                    regnum = ${regnum} 
                    AND password = '${password}' `;
    return db.sqlQueryPromise(sql, 'PasswordModel.checkVisitorsPassword')
  }

  editPasswordInTable(table: string, valuesArr: Array<any>): Promise<any>{
    const sql = `UPDATE ${table} SET password=? WHERE regnum=?`;
    return db.sqlQueryPromise(sql, 'PasswordModel.editPasswordInTable', valuesArr)
  }

  delRowInPasswords(valuesArr: Array<any>): Promise<any>{
    const sql = `DELETE FROM passwords WHERE regnum=?`;
    return db.sqlQueryPromise(sql, 'PasswordModel.delRowInPasswords', valuesArr)
  }
  
}
 
export default new Model();