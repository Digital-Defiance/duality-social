/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import express = require('express');
import { Request, Response } from 'express';
import { ConfidentialClientApplication, CryptoProvider } from '@azure/msal-node';

import {
    msalConfig,
    REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI
} from '../authConfig';

export const router = express.Router();

const msalInstance = new ConfidentialClientApplication(msalConfig);
const cryptoProvider = new CryptoProvider();

/**
 * Prepares the auth code request parameters and initiates the first leg of auth code flow
 * @param req: Express request object
 * @param res: Express response object
 * @param next: Express next function
 * @param authCodeUrlRequestParams: parameters for requesting an auth code url
 * @param authCodeRequestParams: parameters for requesting tokens using auth code
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function redirectToAuthCodeUrl(req: Request, res: Response, next: (error: Error | unknown) => void, authCodeUrlRequestParams: any, authCodeRequestParams: any) {

    // Generate PKCE Codes before starting the authorization flow
    const { verifier, challenge } = await cryptoProvider.generatePkceCodes();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny: any = req.session as any
    // Set generated PKCE codes and method as session vars
    sessionAny.pkceCodes = {
        challengeMethod: 'S256',
        verifier: verifier,
        challenge: challenge,
    };

    /**
     * By manipulating the request objects below before each request, we can obtain
     * auth artifacts with desired claims. For more information, visit:
     * https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_node.html#authorizationurlrequest
     * https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_node.html#authorizationcoderequest
     **/

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sessionAny.authCodeUrlRequest = {
        redirectUri: REDIRECT_URI,
        responseMode: 'form_post', // recommended for confidential clients
        codeChallenge: sessionAny.pkceCodes.challenge,
        codeChallengeMethod: sessionAny.pkceCodes.challengeMethod,
        ...authCodeUrlRequestParams,
    };

    sessionAny.authCodeRequest = {
        redirectUri: REDIRECT_URI,
        code: "",
        ...authCodeRequestParams,
    };

    // Get url to sign user in and consent to scopes needed for application
    try {
        const authCodeUrlResponse = await msalInstance.getAuthCodeUrl(sessionAny.authCodeUrlRequest);
        res.redirect(authCodeUrlResponse);
    } catch (error) {
        next(error);
    }
};

router.get('/signin', async (req: Request, res: Response, next) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny: any = req.session as any

    // create a GUID for crsf
    sessionAny.csrfToken = cryptoProvider.createNewGuid();

    /**
     * The MSAL Node library allows you to pass your custom state as state parameter in the Request object.
     * The state parameter can also be used to encode information of the app's state before redirect.
     * You can pass the user's state in the app, such as the page or view they were on, as input to this parameter.
     */
    const state = cryptoProvider.base64Encode(
        JSON.stringify({
            csrfToken: sessionAny.csrfToken,
            redirectTo: '/'
        })
    );

    const authCodeUrlRequestParams = {
        state: state,

        /**
         * By default, MSAL Node will add OIDC scopes to the auth code url request. For more information, visit:
         * https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
         */
        scopes: [],
    };

    const authCodeRequestParams = {

        /**
         * By default, MSAL Node will add OIDC scopes to the auth code request. For more information, visit:
         * https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
         */
        scopes: [],
    };

    // trigger the first leg of auth code flow
    return redirectToAuthCodeUrl(req, res, next, authCodeUrlRequestParams, authCodeRequestParams)
});

router.get('/acquireToken', async function (req, res, next) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny: any = req.session as any

    // create a GUID for csrf
    sessionAny.csrfToken = cryptoProvider.createNewGuid();

    // encode the state param
    const state = cryptoProvider.base64Encode(
        JSON.stringify({
            csrfToken: sessionAny.csrfToken,
            redirectTo: '/users/profile'
        })
    );

    const authCodeUrlRequestParams = {
        state: state,
        scopes: ["User.Read"],
    };

    const authCodeRequestParams = {
        scopes: ["User.Read"],
    };

    // trigger the first leg of auth code flow
    return redirectToAuthCodeUrl(req, res, next, authCodeUrlRequestParams, authCodeRequestParams)
});

router.post('/redirect', async function (req: Request, res: Response, next) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny: any = req.session as any

    if (req.body.state) {
        const state = JSON.parse(cryptoProvider.base64Decode(req.body.state));

        // check if csrfToken matches
        if (state.csrfToken === sessionAny.csrfToken) {
            sessionAny.authCodeRequest.code = req.body.code; // authZ code
            sessionAny.authCodeRequest.codeVerifier = sessionAny.pkceCodes.verifier // PKCE Code Verifier

            try {
                const tokenResponse = await msalInstance.acquireTokenByCode(sessionAny.authCodeRequest);
                sessionAny.accessToken = tokenResponse.accessToken;
                sessionAny.idToken = tokenResponse.idToken;
                sessionAny.account = tokenResponse.account;
                sessionAny.isAuthenticated = true;

                res.redirect(state.redirectTo);
            } catch (error) {
                next(error);
            }
        } else {
            next(new Error('csrf token does not match'));
        }
    } else {
        next(new Error('state is missing'));
    }
});

router.get('/signout', function (req, res) {
    /**
     * Construct a logout URI and redirect the user to end the
     * session with Azure AD. For more information, visit:
     * https://docs.microsoft.com/azure/active-directory/develop/v2-protocols-oidc#send-a-sign-out-request
     */
    const logoutUri = `${msalConfig.auth.authority}/oauth2/v2.0/logout?post_logout_redirect_uri=${POST_LOGOUT_REDIRECT_URI}`;

    req.session.destroy(() => {
        res.redirect(logoutUri);
    });
});

// custom middleware to check auth state
export function isAuthenticated(req: Request, res: Response, next: (error?: unknown) => void) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny: any = req.session as any;
    if (!sessionAny.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }

    next();
};