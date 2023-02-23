const clientId = process.env.CLIENT_ID ?? '6226576d-37e9-49eb-b201-ec1eeb0029b6';
const cloudInstance = process.env.CLOUD_INSTANCE ?? 'https://login.microsoftonline.com/common';
const tenantId = process.env.TENANT_ID ?? '';
const authority = cloudInstance + tenantId;

export const environment = {
    production: process.env.NODE_ENV === 'production',
    openai: {
        accessToken: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION
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
        redirectUri: process.env.MSAL_REDIRECT_URI ?? '/',
        postLogoutRedirectUri: process.env.MSAL_POST_LOGOUT_REDIRECT_URI ?? '/',
        tenantId: process.env.MSAL_TENANT_ID,
        clientSecret: process.env.MSAL_CLIENT_SECRET
    },
    host: process.env.HOST ?? 'localhost',
    port: Number(process.env.PORT ?? 3000)
};