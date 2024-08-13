import { Schema } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanity-type';
import { ViewpointTypeEnum } from '../enumerations/viewpoint-type';
import ModelName from '../enumerations/model-name';
import { IPostViewpointDocument } from '../documents/post-viewpoint';
import { DefaultReactionsTypeEnum } from '../enumerations/default-reactions-type';

export const PostViewpointSchema = new Schema<IPostViewpointDocument>(
  {
    /**
     * Correlation id to link the dualities.
     */
    postId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.Post,
      required: true,
      immutable: true,
    },
    /**
     * What type of entity created this post.
     */
    humanity: {
      type: String,
      enum: Object.values(HumanityTypeEnum),
      required: true,
      immutable: true,
    },
    type: {
      type: String,
      enum: Object.values(ViewpointTypeEnum),
      required: true,
      immutable: true,
    },
    /**
     * The language the post is in- ISO language code, eg 'en-US' or 'en'
     */
    lang: {
      type: String,
      required: true,
      immutable: true,
    },
    /**
     * The id of the parent viewpoint if this is a reply.
     */
    pVpId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.PostViewpoint,
      optional: true,
      immutable: true,
    },
    /**
     * The actual content.
     */
    content: { type: String, required: true, immutable: true },
    /**
     * Whether the content has been pre-rendered.
     * Not immutable because rendering may be improved or changed
     */
    rendered: { type: String, required: false },
    /**
     * Whether the content is a translation.
     */
    translated: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date, optional: true },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
      immutable: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
      immutable: true,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      optional: true,
    },
    metadata: {
      replies: { type: Number, default: 0, required: true },
      expands: { type: Number, default: 0, required: true },
      impressions: { type: Number, default: 0, required: true },
      reactions: { type: Number, default: 0, required: true },
      reactionsByType: {
        type: Map,
        of: Number,
        required: true,
        default: () => Object.fromEntries(Object.values(DefaultReactionsTypeEnum).map(type => [type, 0])),
      },
      humanityByType: {
        type: Map,
        of: Number,
        required: true,
        default: () => Object.fromEntries(Object.values(HumanityTypeEnum).map(type => [type, 0])),
      },
      votes: { type: Number, default: 0, required: true },
    },
  },
  { timestamps: true }
);

PostViewpointSchema.index({ postId: 1, humanityType: 1 });
PostViewpointSchema.index({ postId: 1, type: 1 });
PostViewpointSchema.index({ parentViewpointId: 1, createdAt: -1 });
