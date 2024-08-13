import { Schema } from 'mongoose';
import ModelName from '../enumerations/model-name';
import { ILoginDocument } from '../documents/login';

/**
 * Represents a user logging in.
 */
export const LoginSchema = new Schema<ILoginDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: ModelName.User,
    required: true,
    null: false,
    immutable: true,
  },
  ip: { type: String, required: true, null: false, immutable: true },
  userAgent: { type: String, required: true, null: false, immutable: true },
}, { timestamps: true });
