import express, { Application, NextFunction, Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';
import { Middlewares } from './middlewares';
import { AppRouter } from './routers/app';
import { environment } from './environment';
import { ISchemaModels, SchemaModels } from '@duality-social/duality-social-lib';

/**
 * Application class
 */
export class App {
    public readonly app: Application;
    private _db?: typeof mongoose;
    public readonly schemaMap: ISchemaModels;
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
        this.schemaMap = SchemaModels;
    }
    public start() {
        try {
            if (this._ready) {
                throw new Error('App already started');
            }
            Object.values(this.schemaMap).forEach((schema) => {
                console.log(`[ loaded ] schema '${schema.modelName}'`);
            });
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
            this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
                console.error('Unhandled error:', err);
                res.status(500).send('Internal Server Error');
            });
            this.app.listen(environment.developer.port, environment.developer.host, () => {
                this._ready = true;
                console.log(`[ ready ] http://${environment.developer.host}:${environment.developer.port}`);
            });
        } catch (err) {
            console.error('Error starting app:', err);
            process.exit(1);
        }
    }
}

export const application: App = new App();

export default application;