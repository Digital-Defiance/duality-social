export interface IUser {
    _id: string;
    givenName: string;
    surname: string;
    userPrincipalName: string;
    canLogin: boolean;
    createdAt: number;
    updatedAt: number;
  }