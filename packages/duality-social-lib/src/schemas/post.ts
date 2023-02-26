import { Schema } from 'mongoose';
import { HumanityType } from '../lib/enumerations/humanityType';

export const postSchema = new Schema({
  /**
   * Correlation id to link the dualities.
   */
  correlationId: { type: String, null: false, required: true, id: true },
  /**
   * What type of entity created this post.
   */
  humanityType: { type: String, enum: HumanityType, required: true },

  /**
   * The id of the parent post if this is a reply.
   */
  parentId:  { type: Schema.Types.ObjectId, null: true, default: null },
  hidden: { type: Boolean, null: true, default: null },
  hiddenAt: Date,
  createdAt: { type: Date, default: Date.now, required: true, readonly: true },
  createdById: { type: Schema.Types.ObjectId, required: true, readonly: true },
  meta: {
    expands: Number,
    impressions: Number,
    reactions:  Number,
  }
});

export default postSchema;