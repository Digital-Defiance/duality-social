import { Request, Response } from 'express';
import {
    ConfigurationParameters,
  } from 'openai';
import { DevilsAdvocateImagePrompt, generateDallEImage, getOppositeResponseFromOpenAI } from '../services/openai';

const openApiConfig: ConfigurationParameters = { 
    accessToken: process.env['OPENAI_API_KEY'],
    organization: process.env['OPENAI_ORGANIZATION']
};

export async function devilsAdvocate(req: Request, res: Response): Promise<void> {
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
}