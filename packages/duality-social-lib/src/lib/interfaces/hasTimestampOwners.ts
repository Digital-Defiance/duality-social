import { IHasCreator } from "./hasCreator";
import { IHasUpdater } from "./hasUpdater";

export interface IHasTimestampOwners<T = string> extends IHasCreator<T>, IHasUpdater<T> {
    /**
     * The MongoDB unique identifier for the user who created the object.
     */
    createdById: T;
    /**
     * The MongoDB unique identifier for the user who updated the object.
     */
    updatedById: T;
}