import { Schema } from 'mongoose'
/**
 * Toplevel object represents a post with its two viewpoints
 */
export const postSchema = new Schema({
    inputViewpointId: { type: Schema.Types.ObjectId, ref: 'PostViewpoint', required: false },
    aiViewpointId: { type: Schema.Types.ObjectId, ref: 'PostViewpoint', required: false },
    deleted: { type: Boolean, null: true, default: null },
    deletedAt: {type: Date, null: true, default: null },
    /**
     * The id of the parent post if this is a reply.
     */
    parentId:  { type: Schema.Types.ObjectId, ref: 'Post', null: true, default: null },
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
    createdById: { type: Schema.Types.ObjectId, ref: 'User', required: true, readonly: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    updatedById: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    meta: {
        expands: Number,
        impressions: Number,
        reactions:  Number,
      }
    });
  export default postSchema;