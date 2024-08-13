import { Schema } from 'mongoose';
import ModelName from '../enumerations/model-name';
import { IProfileDocument } from '../documents/profile';

export const ProfileSchema = new Schema<IProfileDocument>(
  {
    /**
     * The id of the user whose profile this is
     */
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
      null: false,
      immutable: true,
    },
    givenName: { type: String, optional: true },
    surname: { type: String, optional: true },
    bio: { type: String, optional: true },
    formattedBio: { type: String, optional: true },
    location: { type: String, optional: true },
    website: { type: String, optional: true },
    avatarUrl: { type: String, optional: true },
    coverImageUrl: { type: String, optional: true },
    profileImageUrl: { type: String, optional: true },
    socialUrls: { type: [String], optional: true },
    deletedAt: { type: Date, optional: true },
    verified: { type: Boolean, default: false, required: true },
    verifiedBy: { type: Schema.Types.ObjectId, ref: ModelName.User, optional: true },
  },
  { timestamps: true }
);