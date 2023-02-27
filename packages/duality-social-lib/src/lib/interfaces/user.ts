import { Schema } from 'mongoose';
import { AccountLoginType } from '../enumerations/accountLoginType';
import { AccountStatusType } from '../enumerations/accountStatusType';
import { LockType } from '../enumerations/lockType';

export interface IUserMeta {
  /**
   * How many posts the user has made.
   */
  totalPosts: number;
  /**
   * How many replies the user has made.
   */
  totalReplies: number;
  /**
   * The total number of reactions the user has made on other posts.
   */
  totalReactions: number;
  /**
   * The total number of reactions the user has received on their posts.
   */
  totalReactionsReceived: number;
  /**
   * The total number of votes the user has made on other posts.
   */
  totalVotes: number;
  /**
   * The total number of votes the user has received on their posts.
   */
  totalVotesReceived: number;
  /**
   * The total number of impressions the user has received on their profile.
   */
  totalProfileViewsReceived: number;
  /**
   * The total number of impressions the user has received on their posts.
   */
  totalPostViewsReceived: number;
  /**
   * The total number of impressions the user has received on their replies.
   */
  totalReplyViewsReceived: number;
}

export interface IUser {
  // graphql fields
    givenName: string;
    surname: string;
    userPrincipalName: string;
  // duality social specific fields
  /**
   * Whether the user is allowed to login.
   */
    canLogin: boolean;
  /**
   * Whether the login is via email/password or via external authentication.
   */
    accountType: AccountLoginType;
  /**
   * Whether the account is under any kind of lock.
   */
    adminFreezeType: LockType;

    /**
     * Current account status/standing
     */
    accountStatusType: AccountStatusType;
  /**
   * The user's email address, used for login if accountType is email/password.
   * Used for sending notifications, regardless.
   */
    accountEmail?: string;
  /**
   * Whether the user has verified their email address.
   * See also a record in the email verification collection.
   */
    emailVerified: boolean;
  // metadata
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: Schema.Types.ObjectId;
    meta: IUserMeta;
  }

export interface IUserDocument extends IUser, Document {}