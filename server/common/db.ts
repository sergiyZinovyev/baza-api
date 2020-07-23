import mysql from 'mysql2';
import L from './logger';

export class Db {
  
	connection = mysql.createPool({
		connectionLimit: 100,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME_DEV,
		charset: "cp1251"
	})

	loggerSql(sql: string, arg?: Array<any>): string {
		let result = sql;
		if(arg) arg.forEach(replacement => result = result.replace('?', replacement))
		return result
	}

	sqlQueryPromise(sql: string, funcName: string, valuesArr: Array<any> = []): Promise<any>{
		console.log(`SQL ${funcName}: ${this.loggerSql(sql, valuesArr)}`);
		return new Promise<any>((resolve, reject) => {
			this.connection.query(sql, valuesArr, (err: Error, data: any) => {
				if (err) {
					L.error(err, `sql ${funcName}`);
					return reject(`sql ${funcName} ${err}`);
				}
				return resolve (data);
		  	})
		})
	}

}
  
export default new Db();
  