/**
 * 6226576d-37e9-49eb-b201-ec1eeb0029b6 is the production microsoft client id
 * The other client id possibility is found under the Web App > Authentication under "App (client) ID"
 */
const clientId = process.env.CLIENT_ID ?? '6226576d-37e9-49eb-b201-ec1eeb0029b6';
/**
 * // https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-client-application-configuration
 */
const cloudInstance = process.env.CLOUD_INSTANCE ?? 'https://login.microsoftonline.com/';
/**
 * https://learn.microsoft.com/en-us/azure/active-directory/develop/accounts-overview
 */
const tenantId = process.env.TENANT_ID ?? '9188040d-6c67-4c5b-b112-36a304b66dad';
const authority = cloudInstance + (process.env.TENANT_ID ?? 'common/');
//const authority = cloudInstance + tenantId + '/';
const host = process.env.HOST ?? 'localhost';
const port = Number(process.env.PORT ?? 3000);
const production = process.env.NODE_ENV === 'production';
const sslEnabled = process.env.SSL_ENABLED === 'true';
const urlProto = sslEnabled ? 'https://' : 'http://';
const devHost = (sslEnabled ? `${urlProto}${host}:${port}` : `${urlProto}${host}:${port}/`);
const serverHost = production ? `${urlProto}${host}:${port}/` : devHost;
const redirectUri = serverHost + 'auth/redirect';
export type OpenAiProvider = 'azure' | 'openai';
export interface IEnvironment {
    production: boolean;
    developer: {
        host: string;
        port: number;
        baseUrl: string;
        sslEnabled: boolean;
    };
    openai: {
        type: OpenAiProvider;
        accessToken: string;
        organization?: string;
        model?: string;
        deployment?: string;
    };
    mongo: {
        uri: string;
        sessionCollection: string;
        sessionDatabase: string;
        mongoSessions: boolean;
    };
    cookies: {
        enabled: boolean;
        secret: string;
    };
    msal: {
        clientId: string;
        clientSecret: string;
        cloudInstance: string;
        graphMeEndpoint: string;
        authority: string;
        postLogoutRedirectUri: string;
        tenantId: string;
        redirectUri: string;
    };
}
export const environment: IEnvironment = {
    production: production,
    developer: {
        host: host,
        port: port,
        baseUrl: serverHost,
        sslEnabled: sslEnabled,
    },
    openai: {
        type: 'azure',
        accessToken: process.env.OPENAI_API_KEY ?? '',
        organization: process.env.OPENAI_ORGANIZATION ? process.env.OPENAI_ORGANIZATION : undefined,
        model: process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL : undefined,
        deployment: process.env.OPENAI_DEPLOYMENT ? process.env.OPENAI_DEPLOYMENT : undefined,
    },
    mongo: {
        uri: process.env.MONGO_URL ?? 'mongodb://localhost:27017/duality-social',
        sessionCollection: 'sessions',
        sessionDatabase: 'duality-social',
        mongoSessions: true
    },
    cookies: {
        enabled: process.env.COOKIE_ENABLED === 'true',
        /** 
         * arbitrarily generated string, arbitrarily 100 characters long
         */
        secret: process.env.EXPRESS_SESSION_SECRET ??
            'nGNP42hNZ9JmH!Lvj_JHG@FYWjHt_PRvBq.j**7DTWATj9CiMB' + 
            'L*YWpe4-6YnkikcBqD*vnRFzkhums!xZ!LPRPHB9LFTFaXrBwC'
    },
    msal: {
        clientId: clientId,
        cloudInstance: cloudInstance,
        authority: authority,
        redirectUri: process.env.MSAL_REDIRECT_URI ?? redirectUri,
        postLogoutRedirectUri: process.env.MSAL_POST_LOGOUT_REDIRECT_URI ?? redirectUri,
        tenantId: tenantId,
        clientSecret: process.env.MSAL_CLIENT_SECRET ?? '',
        graphMeEndpoint: (process.env.GRAPH_API_ENDPOINT ?? 'https://graph.microsoft.com/') + "v1.0/me",
    }
};