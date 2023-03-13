import { Schema } from 'mongoose';
import { PostSchemaName } from './post';
import { PostViewpointSchemaName } from './postViewpoint';
export const ViewpointReactionSchemaName = 'Reaction';
export const viewpointReactionSchema = new Schema({
  postId:  { type: Schema.Types.ObjectId, ref: PostSchemaName, required: true, unique: true, readonly: true },
  viewpointId: { type: Schema.Types.ObjectId, ref: PostViewpointSchemaName,required: true, unique: true, readonly: true },
  reaction: { type: String, required: true, readonly: true },
  /**
   * The id of the user that created this reaction.
   */
  ceatedById: { type: Schema.Types.ObjectId, required: true, unique: true, readonly: true },
  /**
   * Whether this reaction has been hidden from the statistics and reaction lists.
   * This could be used to exclude reactions from bots or other situations.
   */
  hidden: { type: Boolean, default: true, required: true, null: false },
  /**
   * Whether this reaction has been deleted.
   */
  deletedAt: { type: Date, default: null, required: false, null: true },
}, { timestamps: true });

export default viewpointReactionSchema;