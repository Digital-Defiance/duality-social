import { App, application } from './application';
import { environment } from './environment';
import { validateEnvironment } from './interfaces/environment';

const app: App = application;

validateEnvironment(environment, () => {
  app.start();
});
