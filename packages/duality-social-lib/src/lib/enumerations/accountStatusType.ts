export enum AccountStatusType {
    /**
     * The account is active.
     */
    AccountActive = 'AccountActive',
    /**
     * The account has been deleted by an administrator.
     */
    AdminDelete = 'AdminDelete',
    /**
     * The account has been deleted by the user,
     * but the deletion is pending the wait period.
     */
    SelfDeleteWaitPeriod = 'SelfDeleteWaitPeriod',
    /**
     * The account has been fully deleted by the user,
     */
    SelfDelete = 'SelfDelete',
}