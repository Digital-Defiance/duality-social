import { Schema } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { PostSchemaName } from './post';
import { UserSchemaName } from './user';
export const PostViewpointSchemaName = 'PostViewpoint';
export const postViewpointSchema = new Schema({
  /**
   * Correlation id to link the dualities.
   */
  postId: { type: Schema.Types.ObjectId, ref: PostSchemaName, null: false, required: true, id: true, readonly: true },
  /**
   * What type of entity created this post.
   */
  humanityType: { type: String, enum: HumanityTypeEnum, required: true, readonly: true },
  /**
   * The language the post is in- ISO language code, eg 'en-US' or 'en'
   */
  language: { type: String, null: false, required: true, readonly: true },
  /**
   * Whether the content has been formatted.
   */
  formatted: { type: Boolean, null: false, required: true, default: false, readonly: true },
  /**
   * The id of the parent viewpoint if this is a reply.
   */
  parentViewpointId:  { type: Schema.Types.ObjectId, ref: PostViewpointSchemaName , null: true, default: null, readonly: true },
  /**
   * The actual content.
   */
  content: { type: String, null: false, required: true, readonly: true },
  deleted: { type: Boolean, null: true, default: null },
  deletedAt: { type: Date, null: true, default: null },
  createdAt: { type: Date, default: Date.now, required: true, readonly: true },
  createdById: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, readonly: true },
  meta: {
    expands: Number,
    impressions: Number,
    reactions:  Number,
  }
},{ timestamps: true });

export default postViewpointSchema;