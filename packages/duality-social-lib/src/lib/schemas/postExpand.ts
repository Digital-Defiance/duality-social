import { Schema } from 'mongoose';
import { PostSchemaName } from './post';
import { PostImpressionSchemaName } from './postImpression';
import { UserSchemaName } from './user';

/**
 * Represents a post being expanded.
 * This is used to track the number of times a post has been expanded.
 */
export const postExpandSchema = new Schema({
    /**
     * The id of the post being expanded.
     */
    postId: { type: Schema.Types.ObjectId, ref: PostSchemaName,required: true, null: false, readonly: true },
    /**
     * The id of the original impression.
     */
    postImpressionId: { type: Schema.Types.ObjectId, ref: PostImpressionSchemaName, required: true, null: false, readonly: true },
    /**
     * The time the post was expanded.
     */
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
    createdById: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, null: false, readonly: true },
});