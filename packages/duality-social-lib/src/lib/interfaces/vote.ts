import { Schema } from 'mongoose';
import { HumanityType } from '../enumerations/humanityType';
import { IHasCreation } from './hasCreation';
import { IHasID } from './hasId';

export interface IVote extends IHasID, IHasCreation {
    postId: Schema.Types.ObjectId;
    humanity: HumanityType;
    createdById: Schema.Types.ObjectId;
}