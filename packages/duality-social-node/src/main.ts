import express from 'express';
import compression from 'compression';
import { router as apiRouter } from './routes/api.route';
import { router as authRouter } from './routes/auth.route';
import { router as usersRouter } from './routes/users.route';
import session = require('express-session');
import { environment } from './environment';

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

app.listen(environment.port, environment.host, () => {
  console.log(`[ ready ] http://${environment.host}:${environment.port}`);
});
