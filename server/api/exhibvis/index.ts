import express from 'express';
import controller from './controllers/controller';
 
const router = express.Router(); 

// Gets an exhibition visitor in the form of an array of objects (type: IExhibvis)
// Arguments: req.query.idVis - visitor id, req.query.exhib - exhibition id
router.get('/getVisitorOfExhib', controller.getVisitorOfExhib);

// Add new row in exhibition_vis. Return info message
// Arguments: req.body (type: IExhibvis)
// Options: req.query.login, req.query.password - login, password of the database user from the table useraccount (name, passw)
router.post('/create', controller.create);

// Sends the client an invitation to the exhibition. Return info message
// Arguments: req.body (type: IEmailOpt)
router.post('/sendInvite', controller.sendInvite);
   
export default router   
 