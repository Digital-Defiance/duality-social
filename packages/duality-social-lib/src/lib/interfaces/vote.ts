import { Schema } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { IHasCreation } from './hasCreation';
import { IHasID } from './hasId';

export interface IVote extends IHasID, IHasCreation {
    postId: Schema.Types.ObjectId;
    humanity: HumanityTypeEnum;
    createdById: Schema.Types.ObjectId;
}