import { Types } from 'mongoose';
import { HumanityTypeEnum } from '../../enumerations/humanity-type.ts';
import { ViewpointTypeEnum } from '../../enumerations/viewpoint-type.ts';
import { IHasSoftDelete } from '../has-soft-delete.ts';
import { IHasTimestamps } from '../has-timestamps.ts';
import { IHasDeleter } from '../has-deleter.ts';
import { DefaultReactionsTypeEnum } from '../../enumerations/default-reactions-type.ts';

export interface IPostViewpoint
  extends IHasTimestamps,
    IHasSoftDelete,
    IHasDeleter {
  /**
   * Correlation id to link the dualities.
   */
  postId: Types.ObjectId;
  /**
   * What type of entity created this post.
   */
  humanity: HumanityTypeEnum;
  /**
   * The raw content of the viewpoint.
   */
  content: string;
  /**
   * Pre-rendered content of the viewpoint.
   */
  rendered: string;
  /**
   * Whether the content is a translation.
   */
  translated: boolean;
  /**
   * The language of the content.
   */
  lang: string;
  /**
   * The id of the parent viewpoint if this is a reply.
   */
  pVpId?: Types.ObjectId;
  metadata: {
    /**
     * The total number of replies for this viewpoint.
     */
    replies: number;
    /**
     * The total number of expansions for this viewpoint.
     */
    expands: number;
    /**
     * The total number of impressions for this viewpoint.
     */
    impressions: number;
    /**
     * The total number of reactions for this viewpoint.
     */
    reactions: number;
    /**
     * The number of reactions of each kind for this viewpoint.
     */
    reactionsByType: { [key in DefaultReactionsTypeEnum]: number };
    /**
     * The number of humanity votes of each kind for this viewpoint.
     */
    humanityByType: { [key in HumanityTypeEnum]: number };
    /**
     * The number of humanity votes for this viewpoint.
     */
    votes: number;
  };
  type: ViewpointTypeEnum;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}
