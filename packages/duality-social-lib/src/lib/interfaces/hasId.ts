export interface IHasID<T = string> {
    /**
     * The MongoDB unique identifier for the object.
     */
    _id?: T;
}