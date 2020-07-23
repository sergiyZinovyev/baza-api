import db from '../../../common/db';

export class Model {

  get(): Promise<any[]> {
    const sql: string = `SELECT * FROM exhibitions_dict`;
    return db.sqlQueryPromise(sql, 'ExhibdictModel.get')
  }

  getNameByGroup(numexhib: number): Promise<any[]> {
    const sql: string =  `SELECT 
                            name 
                          FROM 
                            exhibitions_dict 
                          WHERE 
                            group_exhib = (
                              SELECT 
                                group_exhib 
                              FROM 
                                exhibitions_dict 
                              WHERE 
                                id = (
                                  SELECT 
                                    id_exhib_dict 
                                  FROM 
                                    exhibitions 
                                  WHERE 
                                    numexhib = ${numexhib}
                                )
                            )`;
    return db.sqlQueryPromise(sql, 'ExhibdictModel.get')
  }



}
 
export default new Model();