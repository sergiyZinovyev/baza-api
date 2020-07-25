import BranchModel from './branch.model';


class VisitorsService {

  get(): Promise<any>{
    return BranchModel.get()
  }
 
}
  
export default new VisitorsService();