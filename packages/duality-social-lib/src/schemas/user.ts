import { Schema, Types } from 'mongoose';
import { AccountStatusType } from '../lib/enumerations/accountStatusType';
import { AccountLoginType } from '../lib/enumerations/accountLoginType';
import { AdminLevel } from '../lib/enumerations/adminLevel';
import { LockType } from '../lib/enumerations/lockType';

/**
 * A user in the system.
 */
export const userSchema = new Schema({
  /**
   * Whether the login is via email/password or via external authentication.
   */
  accountType: { type: String, enum: AccountLoginType, default: AccountLoginType.Microsoft, required: true},
  accountStatusType: { type: String, enum: AccountStatusType, default: AccountStatusType.AccountActive, required: true, null: false },
  /**
   * The user's email address, used for login if accountType is email/password.
   * Used for sending notifications, regardless.
   */
  accountEmail: { type: String, unique: true, index: true, null: true, default: null },
  /**
   * Whether the user has verified their email address.
   * See also a record in the email verification collection.
   */
  emailVerified: Boolean,
  /**
   * The user's password hash, used for login if accountType is email/password.
   */
  accountPasswordHash: { type: String, null: true, default: null },
  accoungPasswordSalt: { type: String, null: true, default: null },
  /**
   * The unique @username of the user.
   */
  userName: { type: String, unique: true, required: true, index: true, null: false },
  /**
   * Quick reference field for whether the user is an administrator.
   * Backed up by a record in the adminUsers collection with their
   * sudo password hash and other admin metadata.
   */
  adminLevel: { type: String, enum: AdminLevel, default: AdminLevel.User },
  /**
   * Posts from this account are not included in the main feed.
   * The user sees their own posts.
   */
  shadowBan: Boolean,
  /**
   * The user's profile is not visible to other users (appears deleted).
   */
  userHidden: Boolean,
  /**
   * User's last login date/time.
   * See also logins collection.
   */
  lastLogin: { type: Date, null: true, default: null },
  /**
   * The date/time the user was created.
   */
  createdAt: { type: Date, default: Date.now, required: true, null: false, readonly: true },
  /**
   * The date/time the user was last updated.
   */
  updatedAt: { type: Date, default: null, null: true },
  /**
   * The user who last updated the user.
   */
  updatedById: Types.ObjectId,
  /**
   * The date/time the user was deleted.
   */
  deletedAt: { type: Date, default: null, null: true },
  /**
   * The user who deleted the user.
   */
  deletedById: { type: Types.ObjectId, null: true, default: null },
  /**
   * Current deletion status (none, self-deleted, admin-deleted, etc)
   */
  deletionStatus: { type: String, enum: AccountStatusType, null: true, default: null },
  /**
   * Whether the account is under any kind of lock.
   */
  accountFreeze: { type: String, enum: LockType, default: LockType.PendingEmailVerification },
  meta: {
    /**
     * How many posts the user has made.
     */
    totalPosts: { type: Number, null: false, default: 0 },
    /**
     * How many replies the user has made.
     */
    totalReplies: { type: Number, null: false, default: 0 },
    /**
     * The total number of reactions the user has made on other posts.
     */
    totalReactions: { type: Number, null: false, default: 0 },
    /**
     * The total number of reactions the user has received on their posts.
     */
    totalReactionsReceived: { type: Number, null: false, default: 0 },
    /**
     * The total number of votes the user has made on other posts.
     */
    totalVotes: { type: Number, null: false, default: 0 },
    /**
     * The total number of votes the user has received on their posts.
     */
    totalVotesReceived: { type: Number, null: false, default: 0 },
    /**
     * The total number of impressions the user has received on their profile.
     */
    totalProfileViewsReceived: { type: Number, null: false, default: 0 },
    /**
     * The total number of impressions the user has received on their posts.
     */
    totalPostViewsReceived: { type: Number, null: false, default: 0 },
    /**
     * The total number of impressions the user has received on their replies.
     */
    totalReplyViewsReceived: { type: Number, null: false, default: 0 },
  },
});

export default userSchema;
