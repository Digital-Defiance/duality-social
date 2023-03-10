import { Schema } from 'mongoose';
import { IHasID } from './hasId';

export interface IPostMeta {
    expands: number,
    impressions: number,
    reactions: number,
    reactionsByType: { [key: string]: number };
}

export interface IPost extends IHasID {
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