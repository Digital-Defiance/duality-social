import { IHasTimestamps } from "./has-timestamps"
import { IHasTimestampOwners } from "./has-timestamp-owners"
import { ObjectId } from "mongoose";

export interface IUsernameChange extends IHasTimestamps, IHasTimestampOwners {
    userId: ObjectId;
    oldName: string;
    newName: string;
}