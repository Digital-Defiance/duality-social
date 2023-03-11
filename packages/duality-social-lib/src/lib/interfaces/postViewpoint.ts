import { Schema } from 'mongoose';
import { HumanityType } from '../enumerations/humanityType';
import { IHasID } from './hasId';
import { IHasSoftDelete } from './hasSoftDelete';
import { IHasTimestamps } from './hasTimestamps';
import { IHasUpdates } from './hasUpdates';


export interface IPostViewpointMeta extends IHasUpdates {
  expands: number;
  impressions: number;
  reactions:  number;
  reactionsByType: { [key: string]: number };
}

export interface IPostViewpoint extends IHasID, IHasTimestamps, IHasSoftDelete {
  /**
   * Correlation id to link the dualities.
   */
  postId: Schema.Types.ObjectId;
  /**
   * What type of entity created this post.
   */
  humanityType: HumanityType;
  /**
   * The id of the parent viewpoint if this is a reply.
   */
  parentViewpointId: Schema.Types.ObjectId;
  content: string;
  createdById: Schema.Types.ObjectId;
  updatedById: Schema.Types.ObjectId;
  meta: IPostViewpointMeta;
}