import express from 'express';
import compression from 'compression';
import { router as apiRouter } from './routes/api.route';
import { router as authRouter } from './routes/auth.route';
import { router as usersRouter } from './routes/users.route';
import session = require('express-session');
import https from 'https';
import fs from 'fs';
import { environment } from './environment';
import { AccountInfo, PkceCodes } from "@azure/msal-common";
import { AuthorizationCodeRequest, AuthorizationUrlRequest } from '@azure/msal-node';

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


const _app_folder = 'dist/packages/duality-social-angular/';

const app = express();
app.use(compression());
app.use(express.static(_app_folder, {
  index: ['index.html'],
}));
if (environment.cookies.enabled) {
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
  const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
  }
  https.createServer(httpsOptions, app)
    .listen(environment.developer.port, () => {
        console.log('server running at ' + environment.developer.port)
    });
} else {
  app.listen(environment.developer.port, environment.developer.host, () => {
    console.log(`[ ready ] http://${environment.developer.host}:${environment.developer.port}`);
  });  
}