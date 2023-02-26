import { IUser } from "./user";

export interface IAdminUser extends IUser {
    isAdmin: boolean;
  }