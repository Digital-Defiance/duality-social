import { Configuration, LogLevel } from "@azure/msal-node";
import { environment } from "./environment";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md
 */
export const msalConfig: Configuration = {
    auth: {
        clientId: environment.msal.clientId, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: environment.msal.authority, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        /**
         * Client secret generated from the app registration in Azure portal
         */
        clientSecret: environment.msal.clientSecret,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel: unknown, message: unknown, containsPii: boolean) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: LogLevel.Info,
        }
    }
};
