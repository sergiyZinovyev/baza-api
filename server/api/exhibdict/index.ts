import express from 'express';
import controller from './controllers/controller';

const router = express.Router();
 
// Gets list of exhibitions from exhibitions_dict in the form of an array of objects (type: {id: number, name: string, kod: 0|1, group_exhib: number})
router.get('/', controller.get);

// Gets list of exhibitions name from exhibitions_dict by id
// Return: {name: string}[]
// Arguments: req.query.id - numexhib from exhibitions
router.get('/getNameByGroup', controller.getNameByGroup);

 
export default router 
 