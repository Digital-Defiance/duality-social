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
import { HumanityType, IDevilsAdvocateRequest, IDevilsAdvocateResponse, Post, IPost, PostViewpoint, UserPathName, IPostViewpoint, PostViewpointPathName } from '@digital-defiance/duality-social-lib';
import { Schema } from 'mongoose';



export async function devilsAdvocate(req: Request, res: Response): Promise<void> {
    // stuff the entry in the queue.
    // get the id of the entry, this will be the id of the Post
    // each of the two PostViewpoints will have a reference to the Post
    // the Post will have a reference to the input viewpoint
    // the Post will have a reference to the response viewpoint
    // I say input viewpoint because we may have bots allowed on the platform.


    const body = req.body;
    const userId = new Schema.Types.ObjectId(UserPathName); // TODO: get from auth
    if (body === undefined) {
        res.status(400).json({
            error: 'No request body'
        });
        return;
    }
    const post: Post = new Post();
    post.inputViewpointId = new Schema.Types.ObjectId(PostViewpointPathName);
    post.aiViewpointId = new Schema.Types.ObjectId(PostViewpointPathName);
    const newId = (await post.toPostModel().save())._id;
    if (newId === undefined) {
        res.status(500).json({
            error: 'Failed to create post'
        });
        return;
    }
    post._id = newId;
    const humanViewpoint = new PostViewpoint({
        postId: newId,
        humanityType: HumanityType.Human,
        content: body.postContent,
        createdById: userId,
        updatedById: userId
    } as IPostViewpoint);
    const humanViewpointId = (await humanViewpoint.toPostModel().save())._id;
    if (humanViewpointId === undefined) {
        res.status(500).json({
            error: 'Failed to create human viewpoint'
        });
        return;
    }
    post.inputViewpointId = humanViewpointId;
    post.toPostModel().save();

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
            newId,
            userId);
        const aiPostText = openaiResponse.aiResponse;
        const dallEPrompt = DevilsAdvocateImagePrompt.concat("\n\n", aiPostText);
        // if post has embedded image, generate an image using DALL-E
        const imageResponses: Array<string> = [];
        // TODO: change await pattern to Promise.all
            for (let i = 0; i < aiRequest.images.length; i++) {
                await generateDallEImage(
                    dallEPrompt,
                    aiRequest.images[i],
                    userId).then((responseDataUrl) => {
                        if (responseDataUrl) {
                            imageResponses.push(responseDataUrl);
                        }
                    });
            }
        const response: IDevilsAdvocateResponse = {
            postId: newId,
            aiPostText: aiPostText,
            images: imageResponses
        };
        const aiViewpoint = new PostViewpoint({
            postId: newId,
            humanityType: HumanityType.AI,
            content: aiPostText,
            createdById: userId,
            updatedById: userId
        } as IPostViewpoint);
        const aiViewpointId = (await aiViewpoint.toPostModel().save())._id;
        aiViewpoint._id = aiViewpointId;
        post.aiViewpointId = aiViewpointId ?? new Schema.Types.ObjectId(PostViewpointPathName);
        post.toPostModel().save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}
