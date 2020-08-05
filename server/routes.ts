import { Application } from 'express';
import examplesRouter from './api/examples/controllers/examples/router';
import visitors from './api/visitors';
import regions from './api/regions';
import branch from './api/branch';
import exhibdict from './api/exhibdict';
import exhibitions from './api/exhibitions';
import password from './api/password';
import exhibvis from './api/exhibvis';
import useraccount from './api/usersaccount';
          
export default function routes(app: Application): void {
  app.use('/y/examples', examplesRouter);
  app.use('/visitors', visitors);
  app.use('/region', regions);
  app.use('/branch', branch);
  app.use('/exhibdict', exhibdict);
  app.use('/exhibitions', exhibitions);
  app.use('/password', password);
  app.use('/exhibvis', exhibvis);
  app.use('/useraccount', useraccount);
};   