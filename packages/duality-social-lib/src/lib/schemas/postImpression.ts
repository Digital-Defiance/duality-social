import { Schema } from 'mongoose';
import { PostSchemaName } from './post';
import { UserSchemaName } from './user';

export const PostImpressionSchemaName = 'Impression';
/**
 * Represents a post being viewed.
 * This is used to track the number of times a post has been viewed.
 */
export const postImpressionSchema = new Schema({
    /**
     * The id of the post being viewed.
     */
    postId: { type: Schema.Types.ObjectId, ref: PostSchemaName, required: true, null: false, readonly: true },
    /**
     * The id of the user viewing the post.
     */
    userId: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, null: false, readonly: true },
    /**
     * The ip address of the user viewing the post.
     */
    ip: { type: String, required: true, null: false, readonly: true },
    botExclude: { type: Boolean, default: false, required: true, null: false },
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
    createdById: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, null: false, readonly: true },
});