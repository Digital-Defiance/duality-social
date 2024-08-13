import { Application, json, urlencoded } from "express";
import helmet from 'helmet';
import cors from 'cors';

export class Middlewares {
    private static readonly corsWhitelist = [
        'http://localhost:3000',
        'https://localhost:3000',
        'http://duality.social',
        'https://duality.social',
    ];
    private static readonly corsOptionsDelegate = (
        req: cors.CorsRequest,
        callback: (
            error: Error | null,
            options: cors.CorsOptions | undefined
        ) => void
    ) => {
        let corsOptions: cors.CorsOptions;
        if (req.headers.origin && Middlewares.corsWhitelist.indexOf(req.headers.origin) !== -1) {
            corsOptions = { origin: true };
        } else {
            corsOptions = { origin: false };
        }
        callback(null, corsOptions);
    };
    public static init(app: Application): void {
        // Helmet helps you secure your Express apps by setting various HTTP headers
        app.use(helmet());
        // Enable CORS
        app.use(cors(Middlewares.corsOptionsDelegate));
        // Parse incoming requests with JSON payloads
        app.use(json());
        // Parse incoming requests with urlencoded payloads
        app.use(urlencoded({ extended: true }));
    }
}