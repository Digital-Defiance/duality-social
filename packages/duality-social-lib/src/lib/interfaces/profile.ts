import { IHasID } from "./hasId";

/**
 * Authentication object based profile
 */
export interface IProfile extends IHasID {
    givenName?: string;
    surname?: string;
    userPrincipalName?: string;
    id?: string;
  };