import {
  AppConstants,
  IApiNewPostResponse,
  IPostObject,
  IPostViewpointObject,
  parsePostContent,
  ValidationError,
} from '@duality-social/duality-social-lib';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import sizeOf from 'image-size';
import { MulterRequest } from '../../interfaces/multer-request';
import { RouteConfig } from '../../interfaces/route-config';
import { upload } from '../../multer-config';
import { FeedService } from '../../services/feed';
import { BaseController } from '../base';

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
        middleware: [upload.array('images', AppConstants.MaxPostImages)],
        useAuthentication: true,
        validation: [
          body('isBlogPost')
            .isString()
            .notEmpty()
            .withMessage('isBlogPost is required')
            .custom((value) => {
              if (value !== 'true' && value !== 'false') {
                throw new Error('isBlogPost must be either "true" or "false"');
              }
              return true;
            }),
          body('parentViewpointId').isMongoId().optional(),
          body('parentPostId').isMongoId().optional(),
          body('content')
            .isString()
            .trim()
            .notEmpty()
            .withMessage('Content is required'),
          body('content').custom((value, { req }) => {
            const maxLength = req.body.isBlogPost
              ? AppConstants.MaxBlogPostLength
              : AppConstants.MaxPostLength;
            if (value.length > maxLength) {
              throw new Error(
                `Content must be at most ${maxLength} characters`,
              );
            }
            return true;
          }),
          body('images').custom((value, { req }) => {
            if (!req.files || !req.files.images) return true;
            const images: MulterRequest['files']['images'] = Array.isArray(
              req.files.images,
            )
              ? req.files.images
              : [req.files.images];
            if (images.length > AppConstants.MaxPostImages) {
              if (images.length > AppConstants.MaxPostImages) {
                throw new Error(
                  `Maximum ${AppConstants.MaxPostImages} images allowed`,
                );
              }
              images.forEach((image) => {
                if (image.size > AppConstants.MaxImageSize) {
                  throw new Error(
                    `Image size should not exceed ${AppConstants.MaxImageSize} bytes`,
                  );
                }
                const dimensions = sizeOf(image.buffer);
                if (
                  (dimensions.width &&
                    dimensions.width > AppConstants.MaxImageDimensions.width) ||
                  (dimensions.height &&
                    dimensions.height > AppConstants.MaxImageDimensions.height)
                ) {
                  throw new Error(
                    `Image dimensions should not exceed ${AppConstants.MaxImageDimensions.width}x${AppConstants.MaxImageDimensions.height}`,
                  );
                }
              });
              return true;
            }
          }),
          body().custom((value) => {
            if (value.isBlogPost && value.parentViewpointId) {
              throw new Error('Blog posts cannot have a parentViewpointId');
            }
            if (value.isBlogPost && value.parentPostId) {
              throw new Error('Blog posts cannot have a parentPostId');
            }
            return true;
          }),
        ],
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
      {
        method: 'post',
        path: '/preview',
        handler: this.postPreview,
        useAuthentication: true,
        validation: [
          body('isBlogPost')
            .isString()
            .notEmpty()
            .withMessage('isBlogPost is required')
            .custom((value) => {
              if (value !== 'true' && value !== 'false') {
                throw new Error('isBlogPost must be either "true" or "false"');
              }
              return true;
            }),
          body('parentViewpointId').isMongoId().optional(),
          body('parentPostId').isMongoId().optional(),
          body('content')
            .isString()
            .trim()
            .notEmpty()
            .withMessage('Content is required'),
          body('content').custom((value, { req }) => {
            const maxLength = req.body.isBlogPost
              ? AppConstants.MaxBlogPostLength
              : AppConstants.MaxPostLength;
            if (value.length > maxLength) {
              throw new Error(
                `Content must be at most ${maxLength} characters`,
              );
            }
            return true;
          }),
          body('images').custom((value, { req }) => {
            if (!req.files || !req.files.images) return true;
            const images: MulterRequest['files']['images'] = Array.isArray(
              req.files.images,
            )
              ? req.files.images
              : [req.files.images];
            if (images.length > AppConstants.MaxPostImages) {
              if (images.length > AppConstants.MaxPostImages) {
                throw new Error(
                  `Maximum ${AppConstants.MaxPostImages} images allowed`,
                );
              }
              images.forEach(async (image) => {
                if (image.size > AppConstants.MaxImageSize) {
                  throw new Error(
                    `Image size should not exceed ${AppConstants.MaxImageSize} bytes`,
                  );
                }
                const dimensions = sizeOf(image.buffer);
                if (
                  (dimensions.width &&
                    dimensions.width > AppConstants.MaxImageDimensions.width) ||
                  (dimensions.height &&
                    dimensions.height > AppConstants.MaxImageDimensions.height)
                ) {
                  throw new Error(
                    `Image dimensions should not exceed ${AppConstants.MaxImageDimensions.width}x${AppConstants.MaxImageDimensions.height}`,
                  );
                }
              });
              return true;
            }
          }),
          body().custom((value) => {
            if (value.isBlogPost && value.parentViewpointId) {
              throw new Error('Blog posts cannot have a parentViewpointId');
            }
            if (value.isBlogPost && value.parentPostId) {
              throw new Error('Blog posts cannot have a parentPostId');
            }
            return true;
          }),
        ],
      },
    ];
  }

  async getFeed(req: Request, res: Response) {
    try {
      const feed = await this.feedService.getFeed(req);
      res.status(200).json(feed);
    } catch (error) {
      console.error('Error fetching feed:', error);
      this.sendApiErrorResponse(
        500,
        'An error occurred while fetching the feed',
        error,
        res,
      );
    }
  }

  async newPost(req: Request, res: Response, next: NextFunction) {
    const multerReq = req as MulterRequest;
    // Check number of images
    if (
      multerReq.files &&
      multerReq.files.images &&
      multerReq.files.images.length > AppConstants.MaxPostImages
    ) {
      return this.sendApiErrorResponse(
        400,
        `Maximum ${AppConstants.MaxPostImages} images allowed`,
        null,
        res,
      );
    }
    // Check image size and dimensions
    if (multerReq.files && multerReq.files.images) {
      for (const image of multerReq.files.images) {
        if (image.size > AppConstants.MaxImageSize) {
          return this.sendApiErrorResponse(
            400,
            `Image size should not exceed ${AppConstants.MaxImageSize} bytes`,
            null,
            res,
          );
        }
        const dimensions = sizeOf(image.buffer);
        if (
          dimensions.width &&
          dimensions.height &&
          (dimensions.width > AppConstants.MaxImageDimensions.width ||
            dimensions.height > AppConstants.MaxImageDimensions.height)
        ) {
          return this.sendApiErrorResponse(
            400,
            `Image dimensions should not exceed ${AppConstants.MaxImageDimensions.width}x${AppConstants.MaxImageDimensions.height}`,
            null,
            res,
          );
        }
      }
    }
    try {
      const result = await this.feedService.newPost(req as MulterRequest);
      this.sendApiMessageResponse(
        201,
        {
          message: 'New post created successfully',
          post: result.post.toObject() as IPostObject,
          viewpoint: result.viewpoint.toObject() as IPostViewpointObject,
        } as IApiNewPostResponse,
        res,
      );
    } catch (error) {
      console.error('Error creating new post:', error);
      if (error instanceof ValidationError) {
        this.sendApiErrorResponse(400, error.message, error, res);
        next(error);
        return;
      } else {
        this.sendApiErrorResponse(
          500,
          'An error occurred while creating the post',
          error,
          res,
        );
        next(error);
      }
    }
  }

  async reactToViewpoint(req: Request, res: Response) {
    try {
      const viewpoint = await this.feedService.reactToViewpoint(req, res);
      res.status(200).json(viewpoint);
    } catch (error) {
      console.error('Error reacting to viewpoint:', error);
      this.sendApiErrorResponse(
        500,
        'An error occurred while reacting to the viewpoint',
        error,
        res,
      );
    }
  }

  async rateViewpoint(req: Request, res: Response) {
    try {
      const viewpoint = await this.feedService.voteViewpointHumanity(req, res);
      res.status(200).json(viewpoint);
    } catch (error) {
      console.error('Error rating viewpoint:', error);
      this.sendApiErrorResponse(
        500,
        'An error occurred while rating the viewpoint',
        error,
        res,
      );
    }
  }

  async postPreview(req: Request, res: Response) {
    const content = req.body.content ?? '';
    const isBlogPost = req.body.isBlogPost === 'true';
    const rendered = parsePostContent(content, isBlogPost);
    res.status(200).json({ rendered });
  }
}

export const FeedControllerInstance = new FeedController();
export default FeedControllerInstance.router;
