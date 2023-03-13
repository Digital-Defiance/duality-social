export interface IHasDeleter<T = string> {
    /**
     * The MongoDB unique identifier for the user who deleted the object.
     */
    deletedById?: T;
}