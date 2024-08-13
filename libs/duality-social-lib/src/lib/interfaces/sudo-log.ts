import { IHasCreator } from "./has-creator";
import { IHasTimestamps } from "./has-timestamps";
import { ObjectId } from "mongoose";

export interface ISudoLog extends IHasCreator, IHasTimestamps {
    userId: ObjectId;
    adminUserId: ObjectId;
    success: boolean;
}