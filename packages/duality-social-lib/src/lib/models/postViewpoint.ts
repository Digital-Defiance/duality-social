import { Schema } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { IHasCreation } from '../interfaces/hasCreation';
import { IHasID } from '../interfaces/hasId';
import { IPostMeta } from '../interfaces/post';
import { IPostViewpoint, IPostViewpointMeta } from '../interfaces/postViewpoint';
import { PostSchema } from '../schemas/post';
import { PostViewpointSchemaName } from '../schemas/postViewpoint';
import { BaseModelCache } from './baseModelCache';
import { UserPathName } from './user';
export const PostViewpointModelName = PostViewpointSchemaName;
export const PostViewpointPathName = '/postViewpoints/';
export const PostViewpointCache = new BaseModelCache<PostViewpoint, Schema.Types.ObjectId>(PostViewpointModelName, PostViewpointPathName, PostSchema);

export class PostViewpoint implements IPostViewpoint, IHasID<Schema.Types.ObjectId>, IHasCreation
{
  public _id?: Schema.Types.ObjectId;
  /**
   * Correlation id to link the dualities.
   */
  public postId: Schema.Types.ObjectId;
  /**
   * What type of entity created this post.
   */
  public humanityType: HumanityTypeEnum;
  /**
   * The id of the parent viewpoint if this is a reply.
   */
  public parentViewpointId: Schema.Types.ObjectId;
  public content: string;
  public deletedAt?: Date;
  public get deleted(): boolean {
    return this.deletedAt !== undefined && this.deletedAt.getTime() > 0;
  }
  public parentId?: Schema.Types.ObjectId;
  public createdAt: Date;
  public createdById: Schema.Types.ObjectId;
  public updatedAt: Date;
  public updatedById: Schema.Types.ObjectId;
  public meta: IPostViewpointMeta;

  constructor(doc?: IPostViewpoint) {
    const _now = new Date();
    this._id = doc?._id;
    this.postId = doc?.postId ?? new Schema.Types.ObjectId(PostViewpointPathName);
    this.humanityType = doc?.humanityType ?? HumanityTypeEnum.Human;
    this.parentViewpointId = doc?.parentViewpointId ?? new Schema.Types.ObjectId(PostViewpointPathName);
    this.content = doc?.content ?? '';
    this.deletedAt = doc?.deletedAt ?? undefined;
    this.createdAt = doc?.createdAt ?? _now;
    this.createdById = doc?.createdById ?? new Schema.Types.ObjectId(UserPathName);
    this.updatedAt = doc?.updatedAt ?? _now;
    this.updatedById = doc?.updatedById ?? new Schema.Types.ObjectId(UserPathName);
    this.meta = doc?.meta as IPostMeta ?? { expands: 0, impressions: 0, reactions: 0, reactionsByType: {} };
    this.meta.expands = doc?.meta.expands ?? 0;
    this.meta.impressions = doc?.meta.impressions ?? 0;
    this.meta.reactions = doc?.meta.reactions ?? 0;
    this.meta.reactionsByType = doc?.meta.reactionsByType ?? {};
  }
}