export const AdminLevels = ['Admin', 'User'] as const;
export type AdminLevel = typeof AdminLevels[number];

export const enum AdminLevelEnum {
    /**
     * An admin user.
     */
    Admin = 'Admin',
    /**
     * A regular user.
     */
    User = 'User',
}