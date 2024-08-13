import { Schema } from 'mongoose';
import validator from 'validator';
import { AccountStatusTypeEnum } from '../enumerations/account-status-type';
import { LockTypeEnum } from '../enumerations/lock-type';
import ModelName from '../enumerations/model-name';
import { HumanityTypeEnum } from '../enumerations/humanity-type';
import { AppConstants } from '../constants';
import { IUserDocument } from '../documents/user';
import { isValidTimezone } from '../duality-social-lib';

/**
 * A user in the system.
 */
export const UserSchema = new Schema<IUserDocument>(
  {
    /**
     * The account status/standing
     */
    accountStatusType: {
      type: String,
      enum: Object.values(AccountStatusTypeEnum),
      default: AccountStatusTypeEnum.Active,
      required: true,
      null: false,
    },
    /**
     * The user's email address, used for login if accountType is email/password.
     * Used for sending notifications, regardless.
     */
    email: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      required: true,
      trim: true,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: props => `${props.value} is not a valid email address!`
      },
    },
    /**
     * Whether the user has verified their email address.
     */
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
      null: false,
    },
    /**
     * The unique @username of the user.
     */
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9]+$/, // Alphanumeric validation
      minlength: 3,
      maxlength: 20,
      validate: {
        validator: (v: string) => AppConstants.UsernameRegex.test(v),
        message: props => AppConstants.UsernameRegexError
      },
    },
    /**
     * The user's password, hashed.
     */
    password: {
      type: String, required: true, validate: {
        validator: (v: string) => AppConstants.PasswordRegex.test(v),
        message: props => AppConstants.PasswordRegexError
      }
    },
    /**
     * Whether the user is a human or a bot.
     */
    humanityType: {
      type: String,
      required: true,
      enum: Object.values(HumanityTypeEnum),
    },
    languages: {
      type: [String],
      default: [],
    },
    /**
     * Whether the account is under any kind of lock.
     */
    lockStatus: {
      type: String,
      enum: Object.values(LockTypeEnum),
      default: LockTypeEnum.PendingEmailVerification,
    },
    /**
     * Posts from this account are not included in the main feed.
     * The user sees their own posts.
     */
    shadowBan: { type: Boolean, default: false, required: true, null: false },
    /**
     * The user's profile is not visible to other users (appears deleted).
     */
    userHidden: { type: Boolean, default: false, required: true, null: false },
    /**
     * User's last login date/time.
     * See also logins collection.
     */
    lastLogin: { type: Date, optional: true },
    /**
     * The user's timezone.
     */
    timezone: {
      type: String,
      required: true,
      default: 'UTC',
      validate: {
        validator: function(v: string) {
          return isValidTimezone(v);
        },
        message: props => `${props.value} is not a valid timezone!`
      }
    },
    /**
     * The user who last updated the user.
     */
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      optional: true,
    },
    /**
     * The date/time the user was deleted.
     */
    deletedAt: { type: Date, optional: true },
    /**
     * The user who deleted the user.
     */
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      optional: true,
    },
    metadata: {
      /**
       * How many posts the user has made.
       */
      totalPosts: { type: Number, default: 0 },
      /**
       * How many replies the user has made.
       */
      totalReplies: { type: Number, default: 0 },
      /**
       * The total number of reactions the user has made on other posts.
       */
      totalReactions: { type: Number, default: 0 },
      /**
       * The total number of reactions the user has received on their posts.
       */
      totalReactionsReceived: { type: Number, default: 0 },
      /**
       * The total number of votes the user has made on other posts.
       */
      totalVotes: { type: Number, default: 0 },
      /**
       * The total number of votes the user has received on their posts.
       */
      totalVotesReceived: { type: Number, default: 0 },
      /**
       * The total number of impressions the user has received on their profile.
       */
      totalProfileViewsReceived: { type: Number, default: 0 },
      /**
       * The total number of impressions the user has received on their posts.
       */
      totalPostViewsReceived: { type: Number, default: 0 },
      /**
       * The total number of impressions the user has received on their replies.
       */
      totalReplyViewsReceived: { type: Number, default: 0 },
    }
  },
  { timestamps: true }
);
