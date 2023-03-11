import { Schema } from 'mongoose';
import { IHasDeleter } from './hasDeleter';
import { IHasID } from './hasId';
import { IHasSoftDelete } from './hasSoftDelete';
import { IHasTimestampOwners } from './hasTimestampOwners';
import { IHasTimestamps } from './hasTimestamps';
import { IHasUpdates } from './hasUpdates';

export interface IPostMeta extends IHasUpdates {
    expands: number,
    impressions: number,
    reactions: number,
    reactionsByType: { [key: string]: number };
}

/**
 * This interface represents a post, which is a piece of content that a user can create.
 * It inherits from IHasID, which provides the id property, IHasCreation, which provides the createdAt and updatedAt properties, and IHasSoftDelete, which provides the deletedAt property.
 */
export interface IPost extends IHasID, IHasTimestamps, IHasSoftDelete, IHasTimestampOwners, IHasDeleter {
    // graphql fields

    // duality social specific fields
    /**
     * The id of the parent post if this is a reply.
     */
    parentId?: Schema.Types.ObjectId;
    /**
     * Tree of parentIDs
     */
    parents: Schema.Types.ObjectId[];
    inReplyToViewpointId?: Schema.Types.ObjectId;
    /**
     * Tree of viewpoint parents
     */
    viewpointParents: Schema.Types.ObjectId[];
    inputViewpointId: Schema.Types.ObjectId;
    aiViewpointId: Schema.Types.ObjectId;
    /**
     * The language the post is in- ISO language code, eg 'en-US' or 'en'
     */
    language: string;
    //metadata
    meta: IPostMeta;
}