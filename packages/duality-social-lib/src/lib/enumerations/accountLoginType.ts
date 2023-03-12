export const AccountLoginTypes = ['LocalEmail', 'Microsoft'] as const;
export type AccountLoginType = typeof AccountLoginTypes[number];

export const enum AccountLoginTypeEnum {
    LocalEmail = 'LocalEmail',
    Microsoft = 'Microsoft',
}