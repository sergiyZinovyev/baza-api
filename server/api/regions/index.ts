import express from 'express';
import controller from './controllers/controller';
import validation from './middlewares/validation';

const router = express.Router();

router.get('/', validation.regionValidator(), controller.regions);

export default router 
 