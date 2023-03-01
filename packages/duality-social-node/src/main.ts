import express from 'express';
import compression from 'compression';
import { apiRouter as apiRouter } from './routes/api.route';
import { router as authRouter } from './routes/auth.route';
import { router as usersRouter } from './routes/users.route';
import { cors as corslib } from './cors';
import https from 'https';
import fs from 'fs';
import { environment } from './environment';
import { AccountInfo, PkceCodes } from "@azure/msal-common";
import { AuthorizationCodeRequest, AuthorizationUrlRequest } from '@azure/msal-node';
import logger from 'morgan';
import { json } from 'body-parser';
import session = require('express-session');
import mongoDbSession = require('connect-mongodb-session');
import mongoose from 'mongoose';
  

// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    pkceCodes?: PkceCodes;
    authCodeUrlRequest?: AuthorizationUrlRequest;
    authCodeRequest?: AuthorizationCodeRequest;
    accessToken?: string;
    account?: AccountInfo | null;
    csrfToken?: string;
    idToken?: string;
    isAuthenticated?: boolean;
  }
}
mongoose.set('strictQuery', true);
mongoose.connect(environment.mongo.uri).then(() => {
  const MongoDBStore = mongoDbSession(session);
  const _app_folder = 'dist/packages/duality-social-angular/';
  const app = express();
  app.use(corslib);
  app.use(compression());
  app.use(json());
  app.use(express.json());
  app.use(logger('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(_app_folder, {
    index: ['index.html'],
  }));

  if (environment.cookies.enabled && environment.mongo.mongoSessions) {
    const store = new MongoDBStore({
      uri: environment.mongo.uri,
      databaseName: environment.mongo.sessionDatabase,
      collection: environment.mongo.sessionCollection
    });
    
    // Catch errors
    store.on('error', function(error) {
      console.error(error);
    });
    
    app.use(session({
      secret: environment.cookies.secret,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
      store: store,
      // Boilerplate options, see:
      // * https://www.npmjs.com/package/express-session#resave
      // * https://www.npmjs.com/package/express-session#saveuninitialized
      resave: true,
      saveUninitialized: true
    }));
  } else if (environment.cookies.enabled) {
    app.use(
      session({
          resave: false,
          saveUninitialized: true,
          // randomly generated string, 100 characters long
          secret: environment.cookies.secret,
        })
      );
  }
  app.use('/auth', authRouter)
  app.use('/api', apiRouter);
  app.use('/users', usersRouter);
  app.get('**', (req, res) => {
    res.sendFile('index.html', { root: _app_folder });
  });

  if (environment.developer.sslEnabled) {
    const path = (process.env.NX_WORKSPACE_ROOT ?? '.') + '/packages/duality-social-node/localdev/';
    const httpsOptions = {
      key: fs.readFileSync(path + 'cert.key'),
      cert: fs.readFileSync(path + 'cert.pem')
    }
    https.createServer(httpsOptions, app)
      .listen(environment.developer.port, () => {
          console.log(`[ ready ] https://${environment.developer.host}:${environment.developer.port}`);
      });
  } else {
    app.listen(environment.developer.port, environment.developer.host, () => {
      console.log(`[ ready ] http://${environment.developer.host}:${environment.developer.port}`);
    });  
  }
}).catch((err) => {
  console.log(err);
});