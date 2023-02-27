import { Schema } from 'mongoose';

export interface IPostMeta {
    expands: number,
    impressions: number,
    reactions: number,
    reactionsByType: { [key: string]: number };
}

export interface IPost {
    _id?: Schema.Types.ObjectId;

    // graphql fields

    // duality social specific fields
    /**
     * The id of the parent post if this is a reply.
     */
    parentId?: Schema.Types.ObjectId;
    inputViewpointId: Schema.Types.ObjectId;
    aiViewpointId: Schema.Types.ObjectId;
    //metadata
    deletedAt?: Date;
    createdAt: Date;
    createdById: Schema.Types.ObjectId;
    updatedAt: Date;
    updatedById: Schema.Types.ObjectId;
    meta: IPostMeta;
}

export interface IPostDocument extends IPost, Document {}