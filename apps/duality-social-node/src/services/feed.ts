import { Request, Response } from 'express';
import { Schema, Types as MongooseTypes, PipelineStage } from 'mongoose';
import { ObjectId } from 'bson';
import { sanitizeWhitespace, HumanityTypeEnum, parsePostContent, IFeedPost, IRequestUser, ModelData, PostModel, PostViewpointModel, PostViewpointReactionModel, PostViewpointHumanityModel, DefaultReactionsTypeEnum, PostImpressionModel, PostExpandModel, IFeedPostViewpoint } from '@duality-social/duality-social-lib';

const maxPostLength = 1000;

export class FeedService {
  async recalculateViewpointMetadata(viewpointId: ObjectId): Promise<void> {
    const viewpoint = await PostViewpointModel.findById(viewpointId);
    if (viewpoint === null) {
      throw new Error('Viewpoint not found');
    }

    const replyCount = await PostModel.countDocuments({ rVpId: viewpointId });
    const reactions = await PostViewpointReactionModel.find({ viewpointId });
    const reactionsByType: { [key in DefaultReactionsTypeEnum]: number } = {
      Angry: 0,
      Care: 0,
      Celebrate: 0,
      Hug: 0,
      'Huh?': 0,
      Laugh: 0,
      Like: 0,
      Love: 0,
      Sad: 0,
      Wow: 0,
      Yuck: 0
    };
    for (const reaction of reactions) {
      reactionsByType[reaction.reaction] += 1;
    }
    const impressions = await PostImpressionModel.countDocuments({ viewpointId });
    const expands = await PostExpandModel.countDocuments({ viewpointId });
    const humanityVotesCount = await PostViewpointHumanityModel.countDocuments({ viewpointId });

    viewpoint.metadata.replies = replyCount;
    viewpoint.metadata.expands = expands;
    viewpoint.metadata.impressions = impressions;
    viewpoint.metadata.reactions = reactions.length;
    viewpoint.metadata.reactionsByType = reactionsByType;
    viewpoint.metadata.votes = humanityVotesCount;
    await viewpoint.save();
  }

  async getFeed(req: Request): Promise<IFeedPost[]> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const currentUser: IRequestUser = req.user;
    const preferredLanguages = currentUser.languages;
    const currentDate = new Date();
    const maxPosts = 10; // Example top-level posts limit

    const aggregationPipeline: PipelineStage[] = [
      {
        $match: {
          active: true,
          createdAt: { $lte: currentDate },
          locked: { $ne: true },
          hidden: { $ne: true },
          deleted: { $ne: true }
        }
      },
      {
        $lookup: {
          from: "profiles",
          localField: "createdBy",
          foreignField: "userId",
          as: "userProfile"
        }
      },
      {
        $unwind: "$userProfile"
      },
      {
        $lookup: {
          from: "postviewpoints",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$postId", "$$postId"] },
                    { $in: ["$lang", preferredLanguages] }
                  ]
                }
              }
            }
          ],
          as: "viewpoints"
        }
      },
      {
        $addFields: {
          activityScore: {
            $add: [
              { $size: "$viewpoints" },
              { $sum: "$viewpoints.metadata.replies" },
              { $sum: "$viewpoints.metadata.reactions" },
              { $sum: "$viewpoints.metadata.humanityByType" }
            ]
          }
        }
      },
      {
        $sort: {
          activityScore: -1,
          createdAt: -1
        }
      },
      {
        $limit: maxPosts
      }
    ];

    const posts = await PostModel.aggregate(aggregationPipeline).exec();

    const feedPosts: IFeedPost[] = await Promise.all(posts.map(async post => ({
      id: post._id,
      createdAt: post.createdAt,
      createdBy: post.createdBy,
      viewpoints: await this.getViewpoints(post._id, preferredLanguages)
    })));

    return feedPosts;
  }

  private async getViewpoints(postId: ObjectId, preferredLanguages: string[]): Promise<IFeedPostViewpoint[]> {
    const viewpoints = await PostViewpointModel.find({ postId, lang: { $in: preferredLanguages } }).exec();
    return Promise.all(viewpoints.map(async viewpoint => ({
      id: viewpoint._id,
      content: viewpoint.content,
      rendered: viewpoint.rendered,
      translated: viewpoint.translated,
      lang: viewpoint.lang,
      metadata: {
        replies: viewpoint.metadata.replies,
        expands: viewpoint.metadata.expands,
        impressions: viewpoint.metadata.impressions,
        reactions: viewpoint.metadata.reactions,
        reactionsByType: viewpoint.metadata.reactionsByType,
        humanityByType: viewpoint.metadata.humanityByType,
        votes: viewpoint.metadata.votes,
      },
      type: viewpoint.type,
      createdAt: viewpoint.createdAt,
      createdBy: viewpoint.createdBy,
      replies: await this.getReplies(viewpoint.id, preferredLanguages)
    })));
  }

  private async getReplies(viewpointId: ObjectId, preferredLanguages: string[]): Promise<IFeedPost[]> {
    const replies = await PostModel.find({ $or: [{ inVpId: viewpointId }, { aiVpId: viewpointId }] }).exec();
    return Promise.all(replies.map(async reply => ({
      id: reply._id,
      createdAt: reply.createdAt,
      createdBy: reply.createdBy,
      viewpoints: await this.getViewpoints(reply.id, preferredLanguages)
    })));
  }

  async getMoreFeed(req: Request): Promise<IFeedPost[]> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const currentUser: IRequestUser = req.user;
    const preferredLanguages = currentUser.languages;
    // Validate query parameters
    if (!req.query.lastPostDate || !req.query.lastActivityScore) {
      throw new Error('Missing required query parameters: lastPostDate and lastActivityScore');
    }

    const lastPostDate = new Date(req.query.lastPostDate as string);
    const lastActivityScore = parseInt(req.query.lastActivityScore as string, 10);
    const maxPosts = 10; // Example top-level posts limit

    const aggregationPipeline: PipelineStage[] = [
      {
        $match: {
          active: true,
          createdAt: { $lt: lastPostDate },
          locked: { $ne: true },
          hidden: { $ne: true },
          deleted: { $ne: true }
        }
      },
      {
        $lookup: {
          from: "profiles",
          localField: "createdBy",
          foreignField: "userId",
          as: "userProfile"
        }
      },
      {
        $unwind: "$userProfile"
      },
      {
        $lookup: {
          from: "postviewpoints",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$postId", "$$postId"] },
                    { $in: ["$lang", preferredLanguages] }
                  ]
                }
              }
            }
          ],
          as: "viewpoints"
        }
      },
      {
        $addFields: {
          activityScore: {
            $add: [
              { $size: "$viewpoints" },
              { $sum: "$viewpoints.metadata.replies" },
              { $sum: "$viewpoints.metadata.reactions" },
              { $sum: "$viewpoints.metadata.humanityByType" }
            ]
          }
        }
      },
      {
        $match: {
          activityScore: { $lte: lastActivityScore }
        }
      },
      {
        $sort: {
          activityScore: -1,
          createdAt: -1
        }
      },
      {
        $limit: maxPosts
      }
    ];

    const posts = await PostModel.aggregate(aggregationPipeline).exec();

    const moreFeed: IFeedPost[] = await Promise.all(posts.map(async post => ({
      id: post._id,
      createdAt: post.createdAt,
      createdBy: post.createdBy,
      viewpoints: await this.getViewpoints(post._id, preferredLanguages)
    })));

    return moreFeed;
  }

  async newPost(req: Request, res: Response) {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const content = sanitizeWhitespace(req.body.content);
    const rendered = parsePostContent(content);
    const currentDate = new Date();
    const createdById = new Schema.Types.ObjectId(ModelData.User.path);
    const language = await this.detectPostLanguage(content);

    if (content.length > maxPostLength) {
      res.status(400).send('Post content is too long');
      return;
    }
    if (content.length === 0) {
      res.status(400).send('Post content is empty');
      return;
    }

    const postId = new MongooseTypes.ObjectId(new ObjectId().toString());
    const inputViewpointId = new MongooseTypes.ObjectId(new ObjectId().toString());
    // ensure we always have a copy of the post in english
    const requestedLanguages = language !== 'en' ? ['en'] : [];
    const post = new PostModel({
      _id: postId,
      createdAt: currentDate,
      createdById: createdById,
      updatedAt: currentDate,
      updatedById: createdById,
      inVpId: inputViewpointId,
      reqTransLangs: requestedLanguages,
      metadata: {
        expands: 0,
        impressions: 0,
        reactions: 0,
        reactionsByType: {},
        updatedAt: currentDate,
      },
    });

    const inputViewpoint = new PostViewpointModel({
      _id: inputViewpointId,
      postId: postId,
      humanity: req.user?.humanityType ?? HumanityTypeEnum.Human,
      createdAt: currentDate,
      createdBy: createdById,
      content: content,
      rendered: rendered,
      lang: language,
      metadata: {
        expands: 0,
        impressions: 0,
        reactions: 0,
        reactionsByType: {},
      },
    });
    try {
      const newPost = await PostModel.create(post);
      const newViewpoint = await PostViewpointModel.create(inputViewpoint);
      res.status(200).send({
        post: newPost,
        viewpoint: newViewpoint
      });
    } catch (error) {
      console.error('Error creating new post:', error);
      res.status(500).send('An error occurred while creating the post');
    }
  }

  async newReply(req: Request, res: Response) {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const parentId = req.body.parentId;
    const content = sanitizeWhitespace(req.body.content);
    const createdBy = new Schema.Types.ObjectId(req.body.createdBy); // Assuming the user ID is passed in the request
    const currentDate = new Date();

    if (!parentId) {
      res.status(400).send('Parent post ID is required');
      return;
    }
    if (content.length === 0) {
      res.status(400).send('Reply content cannot be empty');
      return;
    }
    if (content.length > maxPostLength) {
      res.status(400).send('Reply content exceeds maximum length');
      return;
    }

    try {
      const parentPost = await PostModel.findById(parentId);
      if (!parentPost) {
        res.status(404).send('Parent post not found');
        return;
      }

      const reply = new PostModel({
        content: content,
        createdBy: createdBy,
        createdAt: currentDate,
        updatedAt: currentDate,
        parentPostId: parentId,
        // Other fields as necessary
      });

      const newReply = await reply.save();
      res.status(201).json(newReply);
    } catch (error) {
      console.error('Error creating new reply:', error);
      res.status(500).send('An error occurred while creating the reply');
    }
  }

  /**
   * Locally (without calling an external API) detect the language of a given text.
   * @param text 
   * @returns The detected language code or 'unknown' if the language cannot be detected.
   */
  async detectPostLanguage(text: string): Promise<string> {
    try {
      // Use franc to detect the language
      const { franc } = await import('franc');
      const languageCode = franc(text);

      if (languageCode === 'und') {
        return 'unknown';
      } else {
        return languageCode;
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      throw new Error('An error occurred while detecting the language of the text');
    }
  }

  async reactToViewpoint(req: Request, res: Response) {
    const { viewpointId, reaction } = req.body;
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const userId = req.user.id;

    try {
      const viewpoint = await PostViewpointModel.findById(viewpointId);
      if (!viewpoint) {
        res.status(404).send('Viewpoint not found');
        return;
      }

      // Remove existing reaction if it exists
      await PostViewpointReactionModel.findOneAndDelete({ viewpointId, createdBy: userId });

      // Create new reaction if provided
      if (reaction) {
        const newReaction = new PostViewpointReactionModel({
          viewpointId,
          createdBy: userId,
          type: reaction
        });
        await newReaction.save();
      }

      res.status(200).json({ message: 'Reaction updated successfully' });
    } catch (error) {
      console.error('Error reacting to viewpoint:', error);
      res.status(500).send('Internal server error');
    }
  }

  async rateViewpoint(req: Request, res: Response): Promise<void> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const currentUser: IRequestUser = req.user;
    const { viewpointId, humanity } = req.body;

    if (!Object.values(HumanityTypeEnum).includes(humanity)) {
      throw new Error('Invalid humanity type');
    }

    try {
      // Check if the user has already rated this viewpoint
      const existingRating = await PostViewpointHumanityModel.findOne({
        viewpointId,
        createdBy: currentUser.id
      });

      if (existingRating) {
        // If the user has already rated, update the rating
        existingRating.humanity = humanity;
        await existingRating.save();
      } else {
        // If the user has not rated yet, create a new rating
        const newRating = new PostViewpointHumanityModel({
          viewpointId,
          humanity,
          createdBy: currentUser.id
        });
        await newRating.save();
      }

      res.status(200).send({ message: 'Rating submitted successfully' });
    } catch (error) {
      console.error('Error rating viewpoint:', error);
      res.status(500).send({ error: 'Error rating viewpoint' });
    }
  }
}