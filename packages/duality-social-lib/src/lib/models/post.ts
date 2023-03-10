import { Schema } from 'mongoose';
import { IHasID } from '../interfaces/hasId';
import { IPost, IPostMeta } from '../interfaces/post';
import { postSchema } from '../schemas/post';
import { BaseModelCache } from './baseModelCache';
import { PostViewpointPathName } from './postViewpoint';
import { UserPathName } from './user';
export const PostModelName = 'Post';
export const PostPathName = '/posts/';
export const PostCache = new BaseModelCache<Post>(PostModelName, PostPathName, postSchema);

export class Post implements IPost, IHasID
{
  public inputViewpointId: Schema.Types.ObjectId;
  public aiViewpointId: Schema.Types.ObjectId;
  public deletedAt?: Date;
  public parentId?: Schema.Types.ObjectId;
  public createdAt: Date;
  public createdById: Schema.Types.ObjectId;
  public updatedAt: Date;
  public updatedById: Schema.Types.ObjectId;
  public meta: IPostMeta;
  public _id?: string;

  constructor(doc?: IPost) {
    const _now = new Date();
    this._id = doc?._id;
    this.inputViewpointId = doc?.inputViewpointId ?? new Schema.Types.ObjectId(PostViewpointPathName);
    this.aiViewpointId = doc?.aiViewpointId ?? new Schema.Types.ObjectId(PostViewpointPathName);
    this.deletedAt = doc?.deletedAt;
    this.parentId = doc?.parentId;
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