import { Schema, Types } from 'mongoose';

export const postImpressionSchema = new Schema({
    /**
     * The id of the post being viewed.
     */
    postId: { type: Types.ObjectId, required: true, null: false, readonly: true },
    /**
     * The id of the user viewing the post.
     */
    userId: { type: Types.ObjectId, required: true, null: false, readonly: true },
    /**
     * The ip address of the user viewing the post.
     */
    ip: { type: String, required: true, null: false, readonly: true },
    botExclude: { type: Boolean, default: false, required: true, null: false },
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
});