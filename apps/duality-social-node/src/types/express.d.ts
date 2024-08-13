import { IRequestUser } from '@duality-social/duality-social-lib';

declare global {
    namespace Express {
        interface Request {
            user?: IRequestUser;
        }
    }
}