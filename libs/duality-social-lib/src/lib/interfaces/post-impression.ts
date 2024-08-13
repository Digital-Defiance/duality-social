import { IHasTimestamps } from "./has-timestamps";
import { IHasCreator } from "./has-creator";
import { ObjectId } from "mongoose";

export interface IPostImpression extends IHasTimestamps, IHasCreator {
    postId: ObjectId;
    viewpointId?: ObjectId;
    ip: string;
    botExclude: boolean;
}