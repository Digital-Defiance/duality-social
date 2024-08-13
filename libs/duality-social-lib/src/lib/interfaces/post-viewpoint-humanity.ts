import { ObjectId } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanity-type';
import { IHasCreator } from './has-creator';
import { IHasTimestamps } from './has-timestamps';

export interface IPostViewpointHumanity extends IHasTimestamps, IHasCreator {
    viewpointId: ObjectId;
    humanity: HumanityTypeEnum;
}