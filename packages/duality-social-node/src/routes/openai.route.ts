import express from 'express';
import { devilsAdvocate } from '../controllers/openai';

export const openAiRouter = express
    .Router();

openAiRouter
    .post('/devils-advocate', devilsAdvocate);