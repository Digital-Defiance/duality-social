/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { AccountStatusTypeEnum } from '../enumerations/account-status-type';
import { LockTypeEnum } from '../enumerations/lock-type';
import { IHasSoftDelete } from './has-soft-delete';
import { IHasTimestampOwners } from './has-timestamp-owners';
import { IHasTimestamps } from './has-timestamps';
import { HumanityTypeEnum } from '../enumerations/humanity-type';
import { IHasDeleter } from './has-deleter';

export interface IUser extends IHasTimestamps, IHasTimestampOwners, IHasSoftDelete, IHasDeleter {
  username: string;
  languages: string[];
  /**
   * Whether the account is under any kind of lock.
   */
  lockStatus: LockTypeEnum;
  /**
   * Whether the user sees their own posts but no one else does.
   */
  shadowBan: boolean;
  /**
   * Whether the user is hidden from the public in search.
   */
  userHidden: boolean;
  /**
   * Current account status/standing
   */
  accountStatusType: AccountStatusTypeEnum;
  /**
   * Whether the user is a human or a bot.
   */
  humanityType: HumanityTypeEnum,
  /**
   * The user's email address, used for login if accountType is email/password.
   * Used for sending notifications, regardless.
   */
  email: string;
  /**
   * Whether the user has verified their email address.
   */
  emailVerified: boolean;
  /**
   * The date of the last successful login.
   */
  lastLogin?: Date;
  /**
   * The user's password, hashed.
   */
  password: string;
  /**
   * The user's timezone.
   */
  timezone: string;
  // metadata
  metadata: {
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
}