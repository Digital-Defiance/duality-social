import { ObjectId } from "mongoose";
import { IHasTimestamps } from "./has-timestamps";

export interface IAdminUser extends IHasTimestamps {
    userId: ObjectId
    lastSudo?: Date;
    lastFailedSudo?: Date;
    sudoHash: string;
    sudoHashSalt: string;
    get canSudo(): boolean;
  }