export const LockTypes = ['PendingEmailVerification', 'Unlocked', 'Admin', 'ReportPending', 'ReportConfirmed', 'AdminPermanent'] as const;
export type LockType = typeof LockTypes[number];

export enum LockTypeEnum {
    /**
     * The user has not yet verified their email address.
     */
    PendingEmailVerification = 'PendingEmailVerification',
    /**
     * The user is not locked.
     */
    Unlocked = 'Unlocked',
    /**
     * An administrator has locked the user.
     */
    Admin = 'Admin',
    /**
     * Votes placed by other users have placed this account
     * under suspicion for abuse or other reportable offenses.
     * The reports are pending confirmation by an administrator.
     */
    ReportPending = 'ReportPending',
    /**
     * Votes placed by other users have placed this account
     * under suspicion for abuse or other reportable offenses.
     * The reports have been confirmed by an administrator.
     */
    ReportConfirmed = 'ReportConfirmed',
    /**
     * The user has been banned permanently by an administrator.
     */
    Permanent = 'AdminPermanent',
}