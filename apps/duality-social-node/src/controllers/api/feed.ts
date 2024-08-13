import { Request, Response } from 'express';
import { FeedService } from '../../services/feed';
import { requireAuth } from '../../middlewares/require-auth';
import { BaseController } from '../base';
import { RouteConfig } from '../../interfaces/route-config';

export class FeedController extends BaseController {
    private feedService: FeedService;

    constructor() {
        super();
        this.feedService = new FeedService();
    }

    protected getRoutes(): RouteConfig[] {
        return [
            {
                method: 'get',
                path: '/',
                handler: this.getFeed,
                useAuthentication: true,
            },
            {
                method: 'post',
                path: '/',
                handler: this.newPost,
                useAuthentication: true,
            },
            {
                method: 'post',
                path: '/preview',
                handler: this.newReply,
                useAuthentication: true,
            },
            {
                method: 'post',
                path: '/react',
                handler: this.reactToViewpoint,
                useAuthentication: true,
            },
            {
                method: 'post',
                path: '/rate',
                handler: this.rateViewpoint,
                useAuthentication: true,
            },
        ];
    }

    async getFeed(req: Request, res: Response) {
        try {
            const feed = await this.feedService.getFeed(req);
            res.status(200).json(feed);
        } catch (error) {
            console.error('Error fetching feed:', error);
            this.sendApiErrorResponse(500, 'An error occurred while fetching the feed', error, res);
        }
    }

    async newPost(req: Request, res: Response) {
        try {
            const post = await this.feedService.newPost(req, res);
            res.status(200).json(post);
        } catch (error) {
            console.error('Error creating new post:', error);
            this.sendApiErrorResponse(500, 'An error occurred while creating the post', error, res);
        }
    }

    async newReply(req: Request, res: Response) {
        try {
            const reply = await this.feedService.newReply(req, res);
            res.status(201).json(reply);
        } catch (error) {
            console.error('Error creating new reply:', error);
            this.sendApiErrorResponse(500, 'An error occurred while creating the reply', error, res);
        }
    }

    async reactToViewpoint(req: Request, res: Response) {
        try {
            const viewpoint = await this.feedService.reactToViewpoint(req, res);
            res.status(200).json(viewpoint);
        } catch (error) {
            console.error('Error reacting to viewpoint:', error);
            this.sendApiErrorResponse(500, 'An error occurred while reacting to the viewpoint', error, res);
        }
    }

    async rateViewpoint(req: Request, res: Response) {
        try {
            const viewpoint = await this.feedService.rateViewpoint(req, res);
            res.status(200).json(viewpoint);
        } catch (error) {
            console.error('Error rating viewpoint:', error);
            this.sendApiErrorResponse(500, 'An error occurred while rating the viewpoint', error, res);
        }
    }
}

export default new FeedController().router;