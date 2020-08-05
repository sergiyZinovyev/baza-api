import express from 'express';
import controller from './controllers/controller';

const router = express.Router();
 
router.post('/auth', controller.getAccess);
 
export default router  