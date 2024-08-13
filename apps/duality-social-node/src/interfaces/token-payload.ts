export interface ITokenPayload {
    oid: string; // Object ID of the user
    sub: string; // Subject (unique identifier for the user)
    name: string; // Full name of the user
    roles?: string[]; // Array of roles assigned to the user (optional)
    exp: number; // Expiration time of the token
    iat: number; // Issued-at time of the token
    iss: string; // Issuer of the token
    aud: string; // Audience of the token (usually your app's client ID)
    [key: string]: any; // Allows for any additional claims
  }
  