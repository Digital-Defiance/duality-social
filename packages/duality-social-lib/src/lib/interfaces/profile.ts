/**
 * Authentication object based profile
 */
export interface IProfile {
    givenName?: string;
    surname?: string;
    userPrincipalName?: string;
    id?: string;
  };

  export interface IProfileDocument extends IProfile, Document {}