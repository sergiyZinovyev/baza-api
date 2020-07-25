import {IExhibition} from '../controllers/interfaces/interface';
import ExhibitionModel from './exhibition.model';

 
class VisitorsService {

  getAll(): Promise<IExhibition[]> {
    const model = new ExhibitionModel().getAll();
    return model
  }

  getByDate(date: any): Promise<IExhibition[]> {
    const model = new ExhibitionModel().getByDate([date]);
    return model
  }
 
  getById(id: any): Promise<IExhibition[]> {
    const model = new ExhibitionModel().getById([id]);
    return model
  }

}
 
export default new VisitorsService();