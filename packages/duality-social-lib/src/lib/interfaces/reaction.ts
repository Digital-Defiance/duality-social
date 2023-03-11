import { Schema } from 'mongoose';
import { DefaultReactionsTypeEnum } from '../enumerations/defaultReactionsType';
import { ReactionType } from '../enumerations/reactionType';
import { IHasCreation } from './hasCreation';
import { IHasID } from './hasId';

export interface IReaction extends IHasID, IHasCreation {
    /**
     * The viewpoint that the reaction is on.
     */
    viewpointId: Schema.Types.ObjectId;
    /**
     * Whether the reaction is a builtin, emoji, fontawesome, or material reaction.
     */
    type: ReactionType;
    /**
     * The built-in reaction that was made.
     */
    reaction?: DefaultReactionsTypeEnum;
    /**
     * The emoji reaction that was made.
     */
    emojiReaction?: string;
    /**
     * The fontawesome reaction that was made.
     */
    fontAwesomeReaction?: string;
    /**
     * The user who created the reaction/reacted.
     */
    createdById: Schema.Types.ObjectId;
}