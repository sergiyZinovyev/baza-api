import express from 'express';
import controller from './controllers/controller';

const router = express.Router();
 
// Gets branches in the form of an array of objects (type: {branch: string})
router.get('/', controller.get);
 
export default router 
 