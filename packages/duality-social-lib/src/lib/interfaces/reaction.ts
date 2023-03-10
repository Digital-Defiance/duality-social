import { Schema } from 'mongoose';
import { DefaultReactionsType } from '../enumerations/defaultReactionsType';
import { ReactionType } from '../enumerations/reactionType';

export interface IReaction {
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
    reaction?: DefaultReactionsType;
    /**
     * The emoji reaction that was made.
     */
    emojiReaction?: string;
    /**
     * The fontawesome reaction that was made.
     */
    fontAwesomeReaction?: string;
    /**
     * The date/time the reaction was created.
     */
    createdAt: number;
    /**
     * The user who created the reaction/reacted.
     */
    createdById: Schema.Types.ObjectId;
}