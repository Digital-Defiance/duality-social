import { Model, Schema } from 'mongoose';
import validator from 'validator';
import { AccountStatusTypeEnum } from '../enumerations/accountStatusType';
import { LockTypeEnum } from '../enumerations/lockType';
import { IUser } from '../interfaces/user';
import { IHasID } from '../interfaces/hasId';
import ModelName from '../enumerations/modelName';

/**
 * A user in the system.
 */
export const UserSchema = new Schema<IUser>(
  {
    auth0Id: { type: String, unique: true, index: true, required: true },
    accountStatusType: {
      type: String,
      enum: AccountStatusTypeEnum,
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
        validator: async function (value: any) {
          if (!validator.isEmail(value)) {
            return false;
          }
          const userModel = this.constructor as Model<IUser>;
          const user = await userModel.findOne({ email: value });
          if (user) {
            const currentDocument = this as IHasID;
            if (user._id === currentDocument._id) {
              return true;
            }
            return false;
          }
          return true;
        },
      },
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
        validator: async function (value: any) {
          const userModel = this.constructor as Model<IUser>;
          const user = await userModel.findOne({ username: value });
          if (user) {
            const currentDocument = this as IHasID;
            if (user._id === currentDocument._id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: 'The username is already in use.',
      },
    },
    /**
     * Whether the account is under any kind of lock.
     */
    lockStatus: {
      type: String,
      enum: LockTypeEnum,
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
  },
  { timestamps: true }
);