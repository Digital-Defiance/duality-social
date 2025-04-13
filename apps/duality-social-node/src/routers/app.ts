import { Application, static as expressStatic } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { environment } from '../environment';
import { ApiRouter } from './api';

/**
 * Application router
 * Sets up the API and static file serving
 */
export class AppRouter {
  private static readonly indexPath = join(
    environment.developer.reactDir,
    'index.html',
  );
  private static readonly apiRouter: ApiRouter = new ApiRouter();
  /**
   * Initialize the application router
   * @param app
   */
  public static init(app: Application) {
    try {
      if (!environment.developer.reactDir.includes('/dist/')) {
        throw new Error(
          `App does not appear to be running within dist: ${environment.developer.reactDir}`,
        );
      }
      if (!existsSync(AppRouter.indexPath)) {
        throw new Error(`Index file not found: ${AppRouter.indexPath}`);
      }

      app.use('/api', AppRouter.apiRouter.router);

      // Serve static files from the React app build directory
      // app.use(express.static(path.join(__dirname, '..', '..', '..', 'CurseFund-react')));
      const serveStaticWithLogging = expressStatic(
        environment.developer.reactDir,
      );
      app.use((req, res, next) => {
        console.log(`Trying to serve static for ${req.url}`);
        console.log(
          `Full request URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`,
        );

        serveStaticWithLogging(req, res, (err) => {
          if (err) {
            console.error('Error serving static file:', err);
            console.log('Moving to next middleware');
          }
          next();
        });
      });

      // The "catchall" handler: for any request that doesn't
      // match one above, send back React's index.html file.
      // app.get('*', (req, res) => {
      //   res.sendFile(path.join(__dirname,'..', '..', '..', 'CurseFund-react', 'index.html'));
      // });
      app.get('*', (req, res) => {
        console.log(`Attempting to serve: ${AppRouter.indexPath}`);
        res.sendFile(AppRouter.indexPath, (err) => {
          if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error serving the page');
          }
        });
      });
    } catch (err) {
      console.error('Error initializing app router:', err);
      throw err;
    }
  }
}
