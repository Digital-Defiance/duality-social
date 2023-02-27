import { Schema } from 'mongoose';
import { HumanityType } from '../enumerations/humanityType';


export interface IPostViewpointMeta {
  expands: number;
  impressions: number;
  reactions:  number;
  reactionsByType: { [key: string]: number };
}

export interface IPostViewpoint {
  _id?: Schema.Types.ObjectId;
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
  deleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  createdById: Schema.Types.ObjectId;
  updatedAt: Date;
  updatedById: Schema.Types.ObjectId;
  meta: IPostViewpointMeta;
}

export interface IPostViewpointDocument extends IPostViewpoint, Document {}