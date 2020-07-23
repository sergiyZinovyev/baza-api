import L from '../../../common/logger';
import {IRegionReqQuery, IRegionRes, Region} from '../controllers/interfaces/interface';
import db from '../../../common/db';

export class Regions {

  private select(){
    return new Region().keysToString();
  } 

  cities(params: Array<number>): Promise<IRegionRes[]> {
    let sql: string = `SELECT ${this.select()} FROM region WHERE countryid=? AND regionid=? AND cityid > 0`;
    return new Promise((resolve, reject) => {
      db.connection.query(sql, params, function(err: Error, data: IRegionRes[]) {
        if (err) {
          L.error(err, 'sql cities');
          return reject(`sql cities ${err}`);
        }
        return resolve (data);
      })
    })
  }

  regions(params: Array<number>): Promise<IRegionRes[]> {
    let sql: string = `SELECT ${this.select()} FROM region WHERE countryid=? AND regionid>0 AND cityid=0 `;
    return new Promise((resolve, reject) => {
      db.connection.query(sql, params, function(err: Error, data: IRegionRes[]) {
        if (err) {
          L.error(err, 'sql regions');
          return reject(`sql regions ${err}`);
        }
        return resolve (data);
      })
    })
  }

  countries(): Promise<IRegionRes[]> {
    let sql: string = `SELECT ${this.select()} FROM region WHERE regionid=0`;
    return new Promise((resolve, reject) => {
      db.connection.query(sql, function(err: Error, data: IRegionRes[]) {
        if (err) {
          L.error(err, 'sql countries');
          return reject(`sql countries ${err}`);
        }
        return resolve (data);
      })
    })
  }

}

export default new Regions();