import { registerModels } from '@duality-social/duality-social-node-lib';
import express, { Application, Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import { environment } from './environment';
import { Middlewares } from './middlewares';
import { AppRouter } from './routers/app';

/**
 * Application class
 */
export class App {
  public readonly app: Application;
  private _db?: typeof mongoose;
  private _ready: boolean;
  public get db(): typeof mongoose {
    if (!this._db) {
      throw new Error('db is not connected yet. call start() first');
    }
    return this._db;
  }
  public get ready(): boolean {
    return this._ready;
  }
  constructor() {
    this._ready = false;
    this.app = express();
  }
  public start() {
    try {
      if (this._ready) {
        throw new Error('App already started');
      }
      registerModels();
      mongoose
        .connect(environment.mongo.uri)
        .then((value: typeof mongoose) => {
          this._db = value;
          console.log('[ connected ] MongoDB');
        })
        .catch((err) => console.error('MongoDB connection error:', err));

      // init all middlewares and routes
      Middlewares.init(this.app);
      AppRouter.init(this.app);
      // if none of the above handle the request, pass it to error handler
      // this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      this.app.use((err: Error, req: Request, res: Response) => {
        console.error('Unhandled error:', err);
        res.status(500).send('Internal Server Error');
      });
      this.app.listen(
        environment.developer.port,
        environment.developer.host,
        () => {
          this._ready = true;
          console.log(
            `[ ready ] http://${environment.developer.host}:${environment.developer.port}`,
          );
        },
      );
    } catch (err) {
      console.error('Error starting app:', err);
      process.exit(1);
    }
  }
}

export const application: App = new App();

export default application;
