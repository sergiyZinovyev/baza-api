import Model from './model';

class Service {

  get(): Promise<any>{
    return Model.get()
  }

  getNameByGroup(numexhib: number): Promise<any>{
    return Model.getNameByGroup(numexhib)
  } 
 
}
   
export default new Service();