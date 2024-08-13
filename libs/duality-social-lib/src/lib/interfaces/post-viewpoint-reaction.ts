import { ObjectId } from 'mongoose';
import { DefaultReactionsTypeEnum } from '../enumerations/default-reactions-type';
import { IHasCreator } from './has-creator';
import { IHasTimestamps } from './has-timestamps';

export interface IPostViewpointReaction extends IHasTimestamps, IHasCreator {
    /**
     * The post that the reaction is on.
     */
    postId: ObjectId;
    /**
     * The viewpoint that the reaction is on.
     */
    viewpointId: ObjectId;
    /**
     * The built-in reaction that was made.
     */
    reaction: DefaultReactionsTypeEnum;
}