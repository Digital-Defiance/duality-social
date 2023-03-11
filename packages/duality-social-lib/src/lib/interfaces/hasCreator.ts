export interface IHasCreator<T = string> {
    /**
     * The MongoDB unique identifier for the user who created the object.
     */
    createdById: T;
}