import {IExhibvis, Exhibvis} from '../controllers/interfaces/interface';
import Model from './exhibvis.model';

function curentDate(d?: Date){
  let formated_date: string;
  if(d){
    let now = new Date(d);
    let curr_date = ('0' + now.getDate()).slice(-2)
    let curr_month = ('0' + (now.getMonth() + 1)).slice(-2);
    let curr_year = now.getFullYear();
    let curr_hour = now.getHours();
    let curr_minute = now.getMinutes();
    let curr_second = now.getSeconds();
    formated_date = curr_year + "-" + curr_month + "-" + curr_date + " " + curr_hour + ":" + curr_minute + ":" + curr_second;
  }
  else return new Date();
  return formated_date;
}

class Service {

  private identifyNewVisitor(date: string):string{
    if(!date) return '';
    let result: string
    const currentDate = new Date();
    const dateFromDb = new Date(date);
    const differenceDate = (currentDate.getTime() - dateFromDb.getTime())/1000;
    if(differenceDate<60) result = 'new'
    else result = '';
    return result
  }

  getVisitorOfExhib(id_visitor: number, id_exhibition: number): Promise<IExhibvis[]>{
    const valuesArr: Array<number> = [id_visitor, id_exhibition];
    return Model.getVisitorOfExhib(valuesArr)
  }

  async createVisitor(data: IExhibvis, idUser: number, dateOfCreateVisitor: string): Promise<string>{
    const date_vis: Date = new Date();
    const date_reg: Date = new Date();
    const new_visitor: string = this.identifyNewVisitor(dateOfCreateVisitor);
    const exhibVisModel = new Model(data);
    exhibVisModel['date_reg'] = data.registered ? date_reg : '';
    exhibVisModel['date_vis'] = data.visited ? date_vis : '';
    exhibVisModel['reg_user'] = idUser;
    exhibVisModel['new_visitor'] = new_visitor;
    const valuesArr = Object.values(exhibVisModel);
    await exhibVisModel.insert(valuesArr)
    return `create in exhibition_vis`
  }
  
}
 
export default new Service();