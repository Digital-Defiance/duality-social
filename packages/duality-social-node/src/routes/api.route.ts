import { Router } from 'express';
import { testGet } from '../controllers/test';
import { openAiRouter } from '../controllers/openai';
import { isAuthenticated } from './auth.route';

export const router = Router();
// all routes prefixed with /api
router.get('/test', isAuthenticated, testGet);
router.post('/openai', isAuthenticated, openAiRouter)