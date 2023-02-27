import { prop, getModelForClass } from '@typegoose/typegoose';
import { Document, model, Schema } from 'mongoose';
import { AccountLoginType } from '../enumerations/accountLoginType';
import { AccountStatusType } from '../enumerations/accountStatusType';
import { LockType } from '../enumerations/lockType';
import { IUser, IUserMeta } from '../interfaces/user';
import userSchema from '../schemas/user';
export const UserModelName = 'User';
export const UserPathName = '/users/';
export const UserModel = model(UserModelName, userSchema);

export class User implements IUser {
    @prop()
    public adminFreezeType: LockType;
    @prop()
    public accountStatusType: AccountStatusType;
    @prop()
    public accountType: AccountLoginType;
    @prop()
    public emailVerified: boolean;
    @prop()
    public givenName: string;
    @prop()
    public surname: string;
    @prop()
    public userPrincipalName: string;
    @prop()
    public canLogin: boolean;
    @prop()
    public meta: IUserMeta;
    @prop()
    public createdAt: Date;
    @prop()
    public updatedAt: Date;

    constructor(doc?: IUser) {
        const _now = new Date();
        this.adminFreezeType = doc?.adminFreezeType ?? LockType.Unlocked;
        this.accountStatusType = doc?.accountStatusType ?? AccountStatusType.Active;
        this.accountType = doc?.accountType ?? AccountLoginType.LocalEmail;
        this.emailVerified = doc?.emailVerified ?? false;
        this.givenName = doc?.givenName ?? '';
        this.surname = doc?.surname ?? '';
        this.userPrincipalName = doc?.userPrincipalName ?? '';
        this.canLogin = doc?.canLogin ?? false;
        this.meta = doc?.meta as IUserMeta ?? { expands: 0, impressions: 0, reactions: 0, reactionsByType: {} };
        this.createdAt = doc?.createdAt ?? _now;
        this.updatedAt = doc?.updatedAt ?? _now;
    }
    public toUserModel(): Document<Schema.Types.ObjectId,unknown,User> {
        const UserModel = getModelForClass(User);
        const user = new UserModel(this);
        return user;
    }
    public static async byId(id: string): Promise<User> {
        const UserModel = getModelForClass(User);
        const user = await UserModel.findById(id);
        return user as User;
    }
} 