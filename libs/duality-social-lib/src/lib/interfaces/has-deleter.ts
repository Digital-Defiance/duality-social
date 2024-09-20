import { Types } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHasDeleter {
    /**
     * The MongoDB unique identifier for the user who deleted the object.
     */
    deletedBy?: Types.ObjectId;
}