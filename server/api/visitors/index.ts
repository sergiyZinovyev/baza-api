import express from 'express';
import controller from './controllers/controller';
import validation from './middlewares/validation';
import Auth from '../../auth';
 
const router = express.Router(); 

router.post('/common', Auth.check([1,2,3,4,5]), controller.common);
router.post('/common/:value', Auth.check([1,2,3,4,5]), controller.common);
router.post('/get', controller.get);
router.post('/edit', controller.edit);
router.post('/create', controller.create);
router.get('/validcontact', controller.validcontact);
  
export default router   
 