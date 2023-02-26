import { Schema } from 'mongoose';

export const postExpandSchema = new Schema({
    /**
     * The id of the post being expanded.
     */
    postId: { type: Schema.Types.ObjectId, required: true, null: false, readonly: true },
    /**
     * The id of the original impression.
     */
    postImpressionId: { type: Schema.Types.ObjectId, required: true, null: false, readonly: true },
    /**
     * The time the post was expanded.
     */
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
});