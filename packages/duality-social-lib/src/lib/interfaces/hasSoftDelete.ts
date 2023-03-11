export interface IHasSoftDelete
{
    /**
     * The date the object was deleted.
     */
    deletedAt?: Date;
    /**
     * Whether the object has been deleted.
     */
    get Deleted(): boolean;
}