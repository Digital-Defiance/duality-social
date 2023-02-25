// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  msal: {
    authority: 'https://login.microsoftonline.com/83f34336-afeb-4706-b665-02995bbdffc8/',
    clientId: '8c8572d9-9cad-4cee-b00f-4b642f7441bb',
    cloudInstance: 'https://login.microsoftonline.com/',
    redirectUri: 'https://localhost:3000/auth/redirect',
    postLogoutRedirectUri: 'https://localhost:3000/auth/signout',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
