import { Schema } from 'mongoose'
import { UserSchemaName } from './user'

export const PostSchemaName = 'Post'
/**
 * Toplevel object represents a post with its two viewpoints
 */
export const PostSchema = new Schema({
    inputViewpointId: { type: Schema.Types.ObjectId, ref: 'PostViewpoint', required: false },
    aiViewpointId: { type: Schema.Types.ObjectId, ref: 'PostViewpoint', required: false },
    deleted: { type: Boolean, null: true, default: null },
    deletedAt: {type: Date, null: true, default: null },
    /**
     * The id of the parent post if this is a reply.
     */
    parentId:  { type: Schema.Types.ObjectId, ref: PostSchemaName, null: true, default: null },
    createdById: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, readonly: true },
    deletedById: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true },
    updatedById: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true },
    meta: {
        expands: Number,
        impressions: Number,
        reactions:  Number,
        updatedAt: { type: Date, null: false, default: Date.now },
      }
    },{ timestamps: true });