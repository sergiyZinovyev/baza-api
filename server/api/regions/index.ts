import express from 'express';
import controller from './controllers/controller';
import validation from './middlewares/validation';

const router = express.Router();

// Gets regions by coutry id or region id
// Return: Countries or Regions or Cities (type: IRegionRes[])
// Arguments: req.query (type: IRegionReqQuery)
router.get('/', validation.regionValidator(), controller.regions);

export default router 
 