import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import fs from 'fs';
import compression from 'compression';
import cors from 'cors'; 

import installValidator from './openapi';
import auth from '../auth'
 

const app = express();
const exit = process.exit;
 
export default class ExpressServer {
  private routes: (app: Application) => void;
  private root: string;
 
  constructor() {
    const root = path.normalize(__dirname + '/..');
    this.root = root;
    app.set('appPath', root + 'client');
    app.use(cors());
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb'}));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(auth.access()); //
    app.use(compression());
    if(process.env.NODE_ENV === 'production'){
      app.use('/static', express.static(`${root}/public`));
    }  
    else app.use(express.static(`${root}/../public`));
  }

  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }
 
  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
    l.info(
      `up and running in ${
        process.env.NODE_ENV || 'development'
      } @: ${os.hostname()} on port: ${p}}`
    );
    const options = {
      key: fs.readFileSync(`${this.root}/cert/key.pem`),
      cert: fs.readFileSync(`${this.root}/cert/cert.pem`)
    };
    installValidator(app, this.routes)
      .then(() => {
        if(process.env.NODE_ENV === 'production') return https.createServer(options, app).listen(port, welcome(port))
        else return http.createServer(app).listen(port, welcome(port))
      })
      .catch(e => {
        l.error(e);
        exit(1)
      });

    return app;
  }
}