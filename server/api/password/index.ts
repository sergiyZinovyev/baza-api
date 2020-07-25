import express from 'express';
import controller from './controllers/controller';
 
const router = express.Router(); 

// Makes a temporary entry with a new password in an additional table;
// Sends a link to change the password to the specified email address;
// Return: info message;
// Arguments: req.body.regum, req.body.password, req.body.firstpassword, req.body.email;
router.post('/change', controller.change);

// Makes a temporary entry with a "no password" in an additional table;
// Sends a link to change the password to the specified email address;
// Return: info message;
// Arguments: req.body.cellphone, req.body.email;
router.post('/reset', controller.reset);

// edit password in all visitors tables:
// delite entry in additional table;
// Return: info message;
// Arguments: req.query.regum, req.query.password, req.query.firstpassword;
router.get('/set', controller.set);
   
export default router   
 