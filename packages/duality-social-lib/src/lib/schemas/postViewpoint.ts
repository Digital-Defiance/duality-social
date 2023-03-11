import { Schema } from 'mongoose';
import { HumanityType } from '../enumerations/humanityType';
import { UserSchemaName } from './user';
export const PostViewpointSchemaName = 'PostViewpoint';
export const postViewpointSchema = new Schema({
  /**
   * Correlation id to link the dualities.
   */
  postId: { type: String, null: false, required: true, id: true },
  /**
   * What type of entity created this post.
   */
  humanityType: { type: String, enum: HumanityType, required: true },
  /**
   * The id of the parent viewpoint if this is a reply.
   */
  parentViewpointId:  { type: Schema.Types.ObjectId, ref: PostViewpointSchemaName , null: true, default: null },
  content: { type: String, null: false, required: true },
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