import { Request, Response, Router } from 'express';
import {
    DevilsAdvocateImagePrompt,
    getOppositeResponseFromOpenAI
} from '../services/openai';
import { IDevilsAdvocateRequest, IDevilsAdvocateResponse, HumanityTypeEnum, IRequestUser, PostViewpointModel, PostModel, IPostDocument } from '@duality-social/duality-social-lib';
import { ObjectId as BsonObjectId } from 'bson';
import { ViewpointTypeEnum } from '@duality-social/duality-social-lib';

class OpenAIController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/devils-advocate', this.devilsAdvocate.bind(this));
    }

    private async devilsAdvocate(req: Request, res: Response): Promise<void> {
        const user: IRequestUser = req.user as IRequestUser;
        const body = req.body;
        const parentId: BsonObjectId | undefined = new BsonObjectId(req.params.parentId) ?? undefined;
        const userId = new BsonObjectId(new BsonObjectId().toString()); // TODO: get from auth
        console.log('user', user, userId);
        if (body === undefined) {
            res.status(400).json({
                error: 'No request body'
            });
            return;
        }
        const postId = new BsonObjectId();
        const humanViewpoint = new PostViewpointModel({
            post: postId,
            humanity: HumanityTypeEnum.Human,
            content: body.postContent,
            lang: 'en',
            viewpointType: ViewpointTypeEnum.HumanSource,
            createdBy: userId,
            updatedBy: userId
        });
        const humanViewpointId = (await PostViewpointModel.create(humanViewpoint))._id;
        if (humanViewpointId === undefined) {
            res.status(500).json({
                error: 'Failed to create human viewpoint'
            });
            return;
        }
        const post: IPostDocument = await PostModel.create({
            _id: postId,
            inVpId: humanViewpointId,
            imageUrls: [],
            parent: parentId,
            pIds: [],
            vpPIds: [],
            createdBy: userId,
            updatedBy: userId,
            deletedBy: undefined
        });
        if (post === undefined || post._id === undefined) {
            res.status(500).json({
                error: 'Failed to create post'
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
                post._id,
                userId);
            const aiPostText = openaiResponse.aiResponse;
            const dallEPrompt = DevilsAdvocateImagePrompt.concat("\n\n", aiPostText);
            // if post has embedded image, generate an image using DALL-E
            // TODO: change await pattern to Promise.all
            const response: IDevilsAdvocateResponse = {
                postId: postId.toString(),
                aiPostText: aiPostText,
            };
            const aiViewpoint = new PostViewpointModel({
                postId: postId,
                humanityType: HumanityTypeEnum.Ai,
                content: aiPostText,
                createdBy: userId,
                updatedBy: userId
            });
            const aiViewpointId = (await PostViewpointModel.create(aiViewpoint))._id;
            aiViewpoint._id = aiViewpointId;
            post.aiVpId = aiViewpointId;
            const updateStatus = await PostModel.updateOne(
                { _id: post._id },
                { $set: { aiVpId: aiViewpointId } }
            );
            if (updateStatus.modifiedCount == 0) {
                res.status(500).json({
                    error: 'Failed to update post'
                });
                return;
            }
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    }
}

export default OpenAIController;