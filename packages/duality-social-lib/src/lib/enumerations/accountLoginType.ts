export const AccountLoginTypes = ['LocalEmail', 'Microsoft'] as const;
export type AccountLoginType = typeof AccountLoginTypes[number];

export enum AccountLoginTypeEnum {
    LocalEmail = 'LocalEmail',
    Microsoft = 'Microsoft',
}