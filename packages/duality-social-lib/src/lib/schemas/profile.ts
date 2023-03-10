import { Schema } from 'mongoose';

export const profileSchema = new Schema({
  /**
   * The id of the user whose profile this is
   */
  userId: { type: Schema.Types.ObjectId, required: true, null: false, readonly: true },
  userPrincipalName: { type: String, default: null, null: true },
  givenName: { type: String, default: null, null: true },
  surname: { type: String, default: null,null: true },
  bio: { type: String, default: null,null: true },
  location: { type: String, default: null,null: true },
  website: { type: String, default: null,null: true },
  avatar: { type: String, default: null,null: true },
  banner: { type: String, default: null, null: true },
  deletedAt: { type: Date, default: null, null: true },
},{ timestamps: true });
