import { Schema } from 'mongoose';
import ModelName from '../enumerations/model-name';
import { DefaultReactionsTypeEnum } from '../enumerations/default-reactions-type';
import { IPostViewpointReactionDocument } from '../documents/post-viewpoint-reaction';

/**
 * Represents a user reacting to a viewpoint
 */
export const PostViewpointReactionSchema = new Schema<IPostViewpointReactionDocument>({
    postId: { type: Schema.Types.ObjectId, ref: ModelName.Post, required: true, null: false, immutable: true },
    viewpointId: { type: Schema.Types.ObjectId, ref: ModelName.PostViewpoint, required: true, null: false, immutable: true },
    reaction: {
        type: String,
        required: true,
        null: false,
        immutable: true,
        enum: Object.values(DefaultReactionsTypeEnum) // Reference the enum values here
    },
    createdBy: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true, null: false, immutable: true },
}, { timestamps: true });

PostViewpointReactionSchema.index({ viewpointId: 1, reaction: 1 });