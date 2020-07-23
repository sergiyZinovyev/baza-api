import express from 'express';
import controller from './controllers/controller';
 
const router = express.Router(); 

router.post('/change', controller.change);
router.post('/reset', controller.reset);
router.get('/set', controller.set);
  
export default router   
 