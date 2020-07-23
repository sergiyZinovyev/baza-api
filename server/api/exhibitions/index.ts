import express from 'express';
import controller from './controllers/controller';
//import validation from './middlewares/validation';
//import Auth from '../../auth';
  
const router = express.Router(); 

router.get('/', controller.get);
  
export default router   
 