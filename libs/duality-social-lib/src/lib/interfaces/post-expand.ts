import { ObjectId } from "mongoose";
import { IHasTimestamps } from "./has-timestamps";
import { IHasCreator } from "./has-creator";

export interface IPostExpand extends IHasTimestamps, IHasCreator {
    postId: ObjectId;
    postImpression: ObjectId;
    viewpointId?: ObjectId;
    botExclude: boolean;
}