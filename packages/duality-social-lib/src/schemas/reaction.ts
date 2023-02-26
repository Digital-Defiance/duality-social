import { Schema } from 'mongoose';
import { ReactionType } from '../lib/enumerations/reactionType';

export const reactionSchema = new Schema({
  postId:  { type: Schema.Types.ObjectId, required: true, unique: true, readonly: true },
  userId: { type: Schema.Types.ObjectId, required: true, unique: true, readonly: true },
  reaction: { type: String, enum: ReactionType, required: true, readonly: true },
  date: { type: Date, default: Date.now, required: true, readonly: true },
  counted: { type: Boolean, default: true, required: true, null: false },
  hidden: { type: Boolean, default: false, required: true, null: false },
});

export default reactionSchema;