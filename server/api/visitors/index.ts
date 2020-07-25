import express from 'express';
import controller from './controllers/controller';
import Auth from '../../auth';
 
const router = express.Router(); 

// Gets visitors from visitors (type: IVisitorRes[])
// Arguments: req.params.value - regnum of visitor,  req.params.table - name of visitors table
// Options: req.body.model: IVisitor
router.post('/getTable', Auth.check([1,2,3,4,5]), controller.common);
router.post('/getTable/:table', Auth.check([1,2,3,4,5]), controller.common);
router.post('/getTable/:table/:value', Auth.check([1,2,3,4,5]), controller.common);

// Gets visitor by email or celphone or regnum in all visitors table
// Return: IVisitorRes
// Arguments: req.body: { email: any; cellphone: any; regnum?: any; model?: IVisitorRes; }
router.post('/get', controller.get);

// Edits a visitor in a permitted table either creates a new record in visitors_edit if there are no rights 
// Return: info message
// Arguments: req.body: IVisitor
router.post('/edit', controller.edit);

// Create a visitor in a permitted table either creates a new record in visitors_create if there are no rights 
// Return: info message
// Arguments: req.body: IVisitor
router.post('/create', controller.create);

// Check email and cellphone for a match in all visitors tables
// Return: info message if math or status 204(no content)
// Arguments: req.query.field - name of search box; req.query.value - value of search box
// Options: req.query.regnum: visitors id; use for ignore row with specified regnum
router.get('/validcontact', controller.validcontact);
  
export default router   
 