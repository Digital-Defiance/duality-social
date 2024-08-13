import { ObjectId } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHasCreator {
    /**
     * The MongoDB unique identifier for the user who created the object.
     */
    createdBy: ObjectId;
}