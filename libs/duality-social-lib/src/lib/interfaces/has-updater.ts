import { ObjectId } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHasUpdater {
    /**
     * The MongoDB unique identifier for the user who updated the object.
     */
    updatedBy: ObjectId;
}