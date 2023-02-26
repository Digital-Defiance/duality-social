import { Schema, Types } from 'mongoose';

/**
 * An admin user in the system.
 */
export const adminUserSchema = new Schema({
  /**
   * The user id of the admin
   */
  userId: { type: Types.ObjectId, required: true, null: false, readonly: true },
  /**
   * The password hash for sudo access.
   */
  sudoHash: { type: String, required: true, null: false },
  lastSudo: { type: Date, default: Date.now, required: true, null: false, readonly: true },
  meta: {
  },
});

export default adminUserSchema;
