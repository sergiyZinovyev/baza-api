import express from 'express';
import controller from './controllers/controller';
  
const router = express.Router(); 

// Gets all exhibition (or by id, or date)
// Return: IExhibition[]
// Arguments (options): req.query.id - numexhib, req.query.date - date start of period exhibitions
router.get('/', controller.get);
  
export default router   
 