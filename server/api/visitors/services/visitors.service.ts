import {IVisitorRes, IVisitor, Visitor} from '../controllers/interfaces/interface';
import VisitorsModel from '../services/visitors.model';

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

class ArgumentGetVisitorsModel {
  constructor(
    public value?: any, 
    public field?: string, 
    public table?: string
  ) {}
}

class VisitorsService {

  private readonly TABLES = ['visitors_edit', 'visitors_create', 'visitors'];

  private isEmptyObj(obj: Object): boolean {
    return !Object.keys(obj).length
  }

  private executeModel(argumentsArr: ArgumentGetVisitorsModel[], model: VisitorsModel): Promise<IVisitorRes[]> {
    let promise: Promise<IVisitorRes[]> = Promise.resolve([]);
    argumentsArr.forEach((argument: ArgumentGetVisitorsModel) => {
      promise = promise.then((res: IVisitorRes[]) => {
        if (!res || res.length == 0) {
          return model.get([argument.value], argument.field, argument.table)
            .then(model => {
              if (model.length > 0) {
                model[0].options = {receivedTable: argument.table, receivedParam: argument.field}
                return model
              }
              return model
          });
        }
        return res;    
      })        
    })
    return promise
  }
 
  private createArgumentsArr(arg: Object): ArgumentGetVisitorsModel[] {
    let argumentsArr = [];
    this.TABLES.forEach((table: string) => {
      for (const key in arg) {
        if (arg.hasOwnProperty(key) && (key === 'email' || key === 'cellphone' || key === 'regnum') && arg[key]) {
          const value = arg[key];
          const field = key;
          argumentsArr.push(new ArgumentGetVisitorsModel(value, field, table))
        }
      }
    })
    return argumentsArr
  }

  private async getNewRegnum(): Promise<number> {
    const maxRegnum: Array<number> = await VisitorsModel.getMaxRegnum();
    return maxRegnum[0] + 1;
  }

  private _editVisitor(visitorsModel: VisitorsModel, table: string, regnum: number): Promise<any>{
    visitorsModel['datelastcor'] = curentDate();
    delete visitorsModel['password'];
    delete visitorsModel['regnum'];
    const valuesArr = Object.values(visitorsModel);
    return visitorsModel.update(valuesArr, table, regnum)
  }

  private _createVisitor(visitorsModel: VisitorsModel, table: string): Promise<any>{
    visitorsModel['datelastcor'] = curentDate();
    const valuesArr = Object.values(visitorsModel);
    return visitorsModel.insert(valuesArr, table)
  }

  private patchVisitorsModel(visitorsModel: VisitorsModel, model: IVisitorRes): VisitorsModel{
    for (const key in model) {
      if (!visitorsModel.hasOwnProperty(key) && key !== 'options') {
        visitorsModel[key] = model[key]; 
      }
    }
    return visitorsModel
  }



  async getVisitor({ email, cellphone, regnum, model = {} }: { email: any; cellphone: any; regnum?: any; model?: IVisitorRes; }): Promise<IVisitorRes> {
    const argumentsArr = this.createArgumentsArr(arguments[0]);
    const visitorsModel = this.isEmptyObj(model) ? new VisitorsModel() : new VisitorsModel(model);
    const executeModel = await this.executeModel(argumentsArr, visitorsModel);
    return executeModel[0];
  }

  async getAll({ value, model = {} }: { value: string; model?: IVisitorRes; }): Promise<IVisitorRes[]> {
    const argumentsArr = value ? [new ArgumentGetVisitorsModel(value, 'regnum', 'visitors')] : [new ArgumentGetVisitorsModel()];
    const visitorsModel = this.isEmptyObj(model) ? new VisitorsModel() : new VisitorsModel(model);
    const executeModel = await this.executeModel(argumentsArr, visitorsModel);
    return executeModel;
  }

  async editVisitor(dataEdit: IVisitor, editableTable: string, model: IVisitorRes): Promise<any>{
    let promiseResult: string;
    const receivedTable: string = model.options.receivedTable;
    const regnum: number = dataEdit.regnum;
    const visitorsModel = new VisitorsModel(dataEdit);
    const result = await visitorsModel.get([regnum], 'regnum', editableTable);
    if (result.length > 0) {
      await this._editVisitor(this.patchVisitorsModel(visitorsModel, model), editableTable, regnum);
      promiseResult = `edit in ${editableTable}`
    }
    else {
      await this._createVisitor(this.patchVisitorsModel(visitorsModel, model), editableTable)
      promiseResult = `create in ${editableTable}`
    }
    if (receivedTable !== 'visitors' && receivedTable !== editableTable) {
      await visitorsModel.delete(receivedTable, regnum.toString());
      promiseResult = promiseResult + ` | delete in ${receivedTable}`
    }
    return promiseResult
  }

  async createVisitor(dataEdit: IVisitor, editableTable: string): Promise<any>{
    const regnum = await this.getNewRegnum();
    const visitorsModel = new VisitorsModel(dataEdit);
    visitorsModel['datawnesenny'] = curentDate();
    visitorsModel['regnum'] = regnum;
    await this._createVisitor(visitorsModel, editableTable);
    return `create in ${editableTable}`
  }
  
  validcontact(field, value, regnum): Promise<boolean>{
    const _field: string = field;
    const _valuesArr: Array<any> = [value, value, value];
    const visitorsModel = new VisitorsModel({regnum: 1});
    return visitorsModel.validcontact(_field, _valuesArr)
      .then((value: any[]) => {
        if(!value[0]) return true;
        for (let element of value){
          if(!regnum || regnum == '' || element.regnum != regnum) return false;
        };
        return true
      })
  }

}
 
export default new VisitorsService();