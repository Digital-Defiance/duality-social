import { Types } from 'mongoose';
import { IHasSoftDelete } from '../has-soft-delete.ts';
import { IHasSoftDeleter } from '../has-soft-deleter.ts';
import { IHasTimestampOwners } from '../has-timestamp-owners.ts';
import { IHasTimestamps } from '../has-timestamps.ts';

/**
 * This interface represents a post, which is a piece of content that a user can create.
 * One post will consist of a minimum of two viewpoints- one from the user and one from the AI.
 * There may be additional "viewpoints" that are AI translations of either of the other viewpoints.
 * There is no point in keeping both source and rendered copies of translations, so we only keep rendered translations.
 * Source - Human
 * Rendered - Human
 * Source - AI
 * Rendered - AI
 * Rendered - AI Translation
 * It inherits from IHasID, which provides the id property, IHasCreation, which provides the createdAt and updatedAt properties, and IHasSoftDelete, which provides the deletedAt property.
 */
export interface IPost
  extends IHasTimestamps,
    IHasSoftDelete,
    IHasTimestampOwners,
    IHasSoftDeleter {
  /**
   * Whether the post is hidden from the feed.
   */
  hidden: boolean;
  /**
   * The reply depth
   */
  depth: number;
  lastReplyAt?: Date;
  lastReplyBy?: Types.ObjectId;
  /**
   * The id of the parent post if this is a reply.
   */
  pId?: Types.ObjectId;
  /**
   * Tree of parentIDs
   */
  pIds: Types.ObjectId[];
  /**
   * The id of the viewpoint that this viewpoint is a reply to.
   */
  rVpId?: Types.ObjectId;
  /**
   * The id of the parent viewpoint if this is a reply
   */
  vpId?: Types.ObjectId;
  /**
   * Tree of viewpoint parents
   */
  vpPIds: Types.ObjectId[];
  /**
   * The id of the viewpoint that the user inputted.
   */
  inVpId?: Types.ObjectId;
  /**
   * The ids of translations of the user viewpoint
   */
  inVpTransIds: Types.ObjectId[];
  /**
   * The languages that users have requested translations for.
   */
  reqTransLangs: string[];
  /**
   * The id of the viewpoint that the AI generated.
   */
  aiVpId?: Types.ObjectId;
  /**
   * The ids of translations of the ai viewpoint
   */
  aiVpTransIds: Types.ObjectId[];
  /**
   * The languages that the AI has requested translations for.
   */
  aiReqTransLangs: string[];
  /**
   * URLs of embedded images
   */
  imageUrls: string[];
  //metadata
  metadata: {
    /**
     * The total number of replies to both post viewpoints
     */
    replies: number;
    /**
     * The total number of expand clicks to both post viewpoints
     */
    expands: number;
    /**
     * The total number of views to both post viewpoints
     */
    impressions: number;
    /**
     * The total number of reactions to both post viewpoints
     */
    reactions: number;
    /**
     * The total number of humanity votes to both viewpoints
     */
    votes: number;
  };
  procLock?: {
    /**
     * the id of the service that is processing the post
     */
    id: string;
    /**
     * the date that the service started processing the post
     */
    date: Date;
  };
}
