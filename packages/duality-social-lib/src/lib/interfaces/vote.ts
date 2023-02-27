import { Schema } from 'mongoose';
import { HumanityType } from '../enumerations/humanityType';

export interface IVote {
    postId: Schema.Types.ObjectId;
    humanity: HumanityType;
    createdAt: number;
    createdById: Schema.Types.ObjectId;
}

export interface IVoteDocument extends IVote, Document {}