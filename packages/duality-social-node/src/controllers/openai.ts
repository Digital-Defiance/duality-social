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
import { isAuthenticated } from '../routes/auth.route';
import { IDevilsAdvocateRequest, IDevilsAdvocateResponse } from '@digital-defiance/duality-social-lib';



export async function devilsAdvocate(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const userId = '1234'; // TODO: get from auth
    if (body === undefined) {
        res.status(400).json({
            error: 'No request body'
        });
        return;
    }
    const aiRequest: IDevilsAdvocateRequest = body as IDevilsAdvocateRequest;
    if (aiRequest === undefined) {
        res.status(400).json({
            error: 'Invalid request body'
        });
        return;
    }
    try {
        const openaiResponse = await getOppositeResponseFromOpenAI(
            aiRequest.postText,
            aiRequest.postId,
            userId);
        // if post has embedded image, generate an image using DALL-E
        const imageResponses: Array<string> = [];
            for (let i = 0; i < aiRequest.images.length; i++) {
                const imageDataUrl = aiRequest.images[i];
                const responseDataUrl = await generateDallEImage(
                    DevilsAdvocateImagePrompt.concat("\n\n", openaiResponse.aiResponse),
                    userId,
                    imageDataUrl);
                    if (responseDataUrl) {
                        imageResponses.push(responseDataUrl);
                    }
            }
        const response: IDevilsAdvocateResponse = {
            postId: aiRequest.postId,
            aiPostText: openaiResponse.aiResponse,
            images: imageResponses
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}
