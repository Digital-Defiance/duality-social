import { Schema } from 'mongoose';
import { HumanityType } from '../enumerations/humanityType';
import { IHasID } from './hasId';

export interface IVote extends IHasID {
    postId: Schema.Types.ObjectId;
    humanity: HumanityType;
    createdAt: number;
    createdById: Schema.Types.ObjectId;
}