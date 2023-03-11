import { Schema } from 'mongoose';
import { IHasDeleter } from '../interfaces/hasDeleter';
import { IHasID } from '../interfaces/hasId';
import { IHasTimestampOwners } from '../interfaces/hasTimestampOwners';
import { IHasTimestamps } from '../interfaces/hasTimestamps';
import { IPost, IPostMeta } from '../interfaces/post';
import { PostSchema } from '../schemas/post';
import { BaseModelCache } from './baseModelCache';
import { PostViewpointPathName } from './postViewpoint';
import { UserPathName } from './user';
import { PostSchemaName } from '../schemas/post';
export const PostModelName = PostSchemaName;
export const PostPathName = '/posts/';
export const PostCache = new BaseModelCache<Post>(PostModelName, PostPathName, PostSchema);

export class Post<Tids = string> implements IPost, IHasID<Tids>, IHasTimestamps, IHasTimestampOwners<Tids>, IHasDeleter<Tids>
{
  public _id?: Schema.Types.ObjectId;
  public inputViewpointId: Schema.Types.ObjectId;
  public aiViewpointId: Schema.Types.ObjectId;
  public language: string;
  public parentId?: Schema.Types.ObjectId;
  public parents: Schema.Types.ObjectId[] = [];
  public viewpointParents: Schema.Types.ObjectId[] = [];
  public createdAt: Date;
  public createdById: Tids;
  public updatedAt: Date;
  public updatedById: Tids;
  public meta: IPostMeta;
  public deletedAt?: Date;
  public get Deleted(): boolean {
    return this.deletedAt !== undefined && this.deletedAt.getTime() > 0;
  }
  public deletedById?: Tids;

  constructor(doc?: IPost) {
    const _now = new Date();
    this._id = doc?._id;
    this.inputViewpointId = doc?.inputViewpointId ?? new Schema.Types.ObjectId(PostViewpointPathName);
    this.aiViewpointId = doc?.aiViewpointId ?? new Schema.Types.ObjectId(PostViewpointPathName);
    this.language = doc?.language ?? 'en'; // TODO: detect?
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