import { Schema } from 'mongoose';
import { AccountLoginTypeEnum } from '../enumerations/accountLoginType';
import { AccountStatusTypeEnum } from '../enumerations/accountStatusType';
import { LockTypeEnum } from '../enumerations/lockType';
import { IHasID } from '../interfaces/hasId';
import { IUser, IUserMeta } from '../interfaces/user';
import { UserSchema, UserSchemaName } from '../schemas/user';
import { BaseModelCache } from './baseModelCache';
export const UserModelName = UserSchemaName;
export const UserPathName = '/users/';
export const UserCache = new BaseModelCache<User>(UserModelName, UserPathName, UserSchema);

export class User implements IUser, IHasID {
    public _id?: string;
    public accountEmail?: string;
    public adminFreezeType: LockTypeEnum;
    public accountStatusType: AccountStatusTypeEnum;
    public accountType: AccountLoginTypeEnum;
    public emailVerified: boolean;
    public givenName: string;
    public surname: string;
    public userPrincipalName: string;
    public canLogin: boolean;
    public meta: IUserMeta;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt?: Date;
    public deletedBy?: Schema.Types.ObjectId;

    constructor(doc?: IUser) {
        const _now = new Date();
        this.adminFreezeType = doc?.adminFreezeType ?? LockTypeEnum.Unlocked;
        this.accountStatusType = doc?.accountStatusType ?? AccountStatusTypeEnum.Active;
        this.accountType = doc?.accountType ?? AccountLoginType.LocalEmail;
        this.emailVerified = doc?.emailVerified ?? false;
        this.givenName = doc?.givenName ?? '';
        this.surname = doc?.surname ?? '';
        this.userPrincipalName = doc?.userPrincipalName ?? '';
        this.canLogin = doc?.canLogin ?? false;
        this.meta = doc?.meta as IUserMeta ?? { expands: 0, impressions: 0, reactions: 0, reactionsByType: {} };
        this.createdAt = doc?.createdAt ?? _now;
        this.updatedAt = doc?.updatedAt ?? _now;
        this.deletedAt = doc?.deletedAt;
        this.deletedBy = doc?.deletedBy;
    }
} 