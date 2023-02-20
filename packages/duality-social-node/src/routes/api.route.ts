import { Router } from 'express';
import { testGet } from '../controllers/test';

const router = Router();
router.get('/test', testGet);

export { router };