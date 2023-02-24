import { Router } from 'express';
import { testGet } from '../controllers/test';
import { openAiRouter  } from '../routes/openai.route';
import { isAuthenticated } from './auth.route';

// all routes prefixed with /api
export const apiRouter = Router();
// Sub-routers
// -----
// all routes prefixed with /api/openai
apiRouter.use('/openai', isAuthenticated, openAiRouter);

// Commands
// -----
// /api/test
apiRouter.get('/test', testGet);