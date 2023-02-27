import { getModelForClass, prop } from '@typegoose/typegoose';
import { Document, model, Schema } from 'mongoose';
import { IPost, IPostMeta } from '../interfaces/post';
import postSchema from '../schemas/post';
import { PostViewpointPathName } from './postViewpoint';
import { UserPathName } from './user';
export const PostModelName = 'Post';
export const PostPathName = '/posts/';
export const PostModel = model(PostModelName, postSchema);

export class Post implements IPost
{
  @prop()
  public inputViewpointId: Schema.Types.ObjectId;
  @prop()
  public aiViewpointId: Schema.Types.ObjectId;
  @prop()
  public deletedAt?: Date;
  @prop()
  public parentId?: Schema.Types.ObjectId;
  @prop()
  public createdAt: Date;
  @prop()
  public createdById: Schema.Types.ObjectId;
  @prop()
  public updatedAt: Date;
  @prop()
  public updatedById: Schema.Types.ObjectId;
  @prop()
  public meta: IPostMeta;

  public _id?: Schema.Types.ObjectId;

  constructor(doc?: IPost) {
    const _now = new Date();
    this._id = doc?._id;
    this.inputViewpointId = doc?.inputViewpointId ?? new Schema.Types.ObjectId(PostViewpointPathName);
    this.aiViewpointId = doc?.aiViewpointId ?? new Schema.Types.ObjectId(PostViewpointPathName);
    this.deletedAt = doc?.deletedAt ?? undefined;
    this.parentId = doc?.parentId ?? undefined;
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

  public toPostModel(): Document<Schema.Types.ObjectId,unknown,Post> {
    const postModel = getModelForClass(Post);
    return new postModel(this);
  }
  public static async byId(id: string): Promise<Post> {
      const postModel = getModelForClass(Post);
      return await postModel.findById(id) as Post;
  }
}