export interface IHasUpdater<T = string> {
    /**
     * The MongoDB unique identifier for the user who updated the object.
     */
    updatedById: T;
}