import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  msal: {
    authority: 'https://login.microsoftonline.com/83f34336-afeb-4706-b665-02995bbdffc8/',
    clientId: '8c8572d9-9cad-4cee-b00f-4b642f7441bb',
    cloudInstance: 'https://login.microsoftonline.com/',
    redirectUri: 'https://localhost:3000/auth/redirect',
    postLogoutRedirectUri: 'https://localhost:3000/auth/signout',
  },
  save: {
    clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6',
    redirectUri: 'https://duality.social/auth/redirect',
    postLogoutRedirectUri: 'https://duality.social/auth/signout',
  }
};

