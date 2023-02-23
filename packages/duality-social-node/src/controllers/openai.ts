import { Request, Response } from 'express';
import express = require('express');
import {
    ConfigurationParameters,
  } from 'openai';
import {
    DevilsAdvocateImagePrompt,
    generateDallEImage,
    getOppositeResponseFromOpenAI
} from '../services/openai';
import { environment } from '../environment';
import { isAuthenticated } from '../routes/auth.route';

const openApiConfig: ConfigurationParameters = { 
    accessToken: environment.openai.accessToken,
    organization: environment.openai.organization
};

export async function devilsAdvocate(req: Request, res: Response): Promise<void> {
    try {
        const post: string = req.body.post;
        const postId: string = req.body.postId;
        const userId: string = req.body.userId;
        const images: Array<string> = req.body.images;
        const openaiResponse = await getOppositeResponseFromOpenAI(openApiConfig,
            post,
            postId,
            userId);
        // if post has embedded image, generate an image using DALL-E
        const imageResponses: Array<string> = [];
            for (let i = 0; i < images.length; i++) {
                const imageDataUrl = images[i];
                const responseDataUrl = await generateDallEImage(
                    openApiConfig,
                    DevilsAdvocateImagePrompt + "\n\n" +
                    openaiResponse.aiResponse,
                    userId,
                    imageDataUrl);
                    if (responseDataUrl) {
                        imageResponses.push(responseDataUrl);
                    }
            }
        res.status(200).json({
            aiResponse: openaiResponse.aiResponse,
            imageResponses: imageResponses
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

export const openAiRouter = express
    .Router()
    .post('/devils-advocate', isAuthenticated, devilsAdvocate);