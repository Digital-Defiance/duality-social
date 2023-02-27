import { Schema } from 'mongoose';

export const reactionSchema = new Schema({
  postId:  { type: Schema.Types.ObjectId, required: true, unique: true, readonly: true },
  userId: { type: Schema.Types.ObjectId, required: true, unique: true, readonly: true },
  reaction: { type: String, required: true, readonly: true },
  date: { type: Date, default: Date.now, required: true, readonly: true },
  counted: { type: Boolean, default: true, required: true, null: false },
  deleted: { type: Boolean, default: false, required: true, null: false },
});

export default reactionSchema;