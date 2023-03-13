import { Schema } from 'mongoose'
import { PostViewpointSchemaName } from './postViewpoint';
import { UserSchemaName } from './user'

export const PostSchemaName = 'Post'
/**
 * Toplevel object represents a post with its two viewpoints
 */
export const PostSchema = new Schema({
    /**
     * The id of the parent post if this is a reply.
     */
    parentPostId:  { type: Schema.Types.ObjectId, ref: PostSchemaName, null: true, default: null, readonly: true },
    inputViewpointId: { type: Schema.Types.ObjectId, ref: PostViewpointSchemaName, required: false, readonly: true },
    inputViewpointTranslationIds: [{ type: Schema.Types.ObjectId, ref: PostViewpointSchemaName, required: true }],
    aiViewpointId: { type: Schema.Types.ObjectId, ref: PostViewpointSchemaName, required: false, null: true, default: null },
    aiViewpointTranslationIds: [{ type: Schema.Types.ObjectId, ref: PostViewpointSchemaName, required: true }],
    hidden: { type: Boolean, default: false, required: true, null: false },
    deletedAt: {type: Date, null: true, default: null },
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