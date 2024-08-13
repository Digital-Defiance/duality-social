import { Application, static as expressStatic, NextFunction, Request, Response } from "express";
import { join } from "path";
import { ApiRouter } from './api';
import { environment } from "../environment";
import { existsSync } from "fs";

/**
 * Application router
 * Sets up the API and static file serving
 */
export class AppRouter {
    private static readonly indexPath = join(environment.developer.reactDir, 'index.html');
    private static readonly apiRouter: ApiRouter = new ApiRouter();
    /**
     * Initialize the application router
     * @param app 
     */
    public static init(app: Application) {
        try {
            if (!environment.developer.reactDir.includes('/dist/')) {
                throw new Error(`App does not appear to be running within dist: ${environment.developer.reactDir}`);
            }
            if (!existsSync(AppRouter.indexPath)) {
                throw new Error(`Index file not found: ${AppRouter.indexPath}`);
            }

            app.use('/api', AppRouter.apiRouter.router);

            // Serve static files from the React app build directory
            // app.use(express.static(path.join(__dirname, '..', '..', '..', 'CurseFund-react')));
            const serveStaticWithLogging = expressStatic(environment.developer.reactDir);
            app.use((req, res, next) => {
                console.log(`Trying to serve static for ${req.url}`);
                serveStaticWithLogging(req, res, (err) => {
                    if (err) {
                        console.error('Error serving static file:', err);
                        next(err);
                    } else {
                        console.log(`Served static for ${req.url}`);
                    }
                });
                next();
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