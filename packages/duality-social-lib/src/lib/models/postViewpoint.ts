import { getModelForClass, prop } from '@typegoose/typegoose';
import { Document, model, Schema } from 'mongoose';
import { HumanityType } from '../enumerations/humanityType';
import { IPostMeta } from '../interfaces/post';
import { IPostViewpoint, IPostViewpointMeta } from '../interfaces/postViewpoint';
import { postSchema } from '../schemas/post';
import { UserPathName } from './user';
export const PostViewpointModelName = 'PostViewpoint';
export const PostViewpointPathName = '/postViewpoints/';
export const PostViewpointModel = model(PostViewpointModelName, postSchema);

export class PostViewpoint implements IPostViewpoint
{
  public _id?: Schema.Types.ObjectId;
  /**
   * Correlation id to link the dualities.
   */
  @prop()
  public postId: Schema.Types.ObjectId;
  /**
   * What type of entity created this post.
   */
  @prop()
  public humanityType: HumanityType;
  /**
   * The id of the parent viewpoint if this is a reply.
   */
  @prop()
  public parentViewpointId: Schema.Types.ObjectId;
  @prop()
  public content: string;
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
  public meta: IPostViewpointMeta;

  constructor(doc?: IPostViewpoint) {
    const _now = new Date();
    this._id = doc?._id;
    this.postId = doc?.postId ?? new Schema.Types.ObjectId(PostViewpointPathName);
    this.humanityType = doc?.humanityType ?? HumanityType.Human;
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

  public toPostModel(): Document<Schema.Types.ObjectId,unknown,PostViewpoint> {
    const postModel = getModelForClass(PostViewpoint);
    return new postModel(this);
  }
  public static async byId(id: string): Promise<PostViewpoint> {
      const postViewpointModel = getModelForClass(PostViewpoint);
      return await postViewpointModel.findById(id) as PostViewpoint;
  }
}