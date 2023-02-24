/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import express = require('express');
import { Request, Response } from 'express';
import { AuthorizationUrlRequest, ConfidentialClientApplication, CryptoProvider } from '@azure/msal-node';

import {
    msalConfig,
} from '../authConfig';
import { environment } from '../environment';

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

    // Set generated PKCE codes and method as session vars
    const challengeMethod = "S256";
    req.session.pkceCodes = {
        //challengeMethod: challengeMethod,
        verifier: verifier,
        challenge: challenge,
    };

    /**
     * By manipulating the request objects below before each request, we can obtain
     * auth artifacts with desired claims. For more information, visit:
     * https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_node.html#authorizationurlrequest
     * https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_node.html#authorizationcoderequest
     **/

    const authCodeUrlRequest: AuthorizationUrlRequest = {
        redirectUri: environment.msal.redirectUri,
        responseMode: 'form_post', // recommended for confidential clients
        codeChallenge: req.session.pkceCodes.challenge,
        codeChallengeMethod: challengeMethod,
        ...authCodeUrlRequestParams,
    };
    req.session.authCodeUrlRequest = authCodeUrlRequest;

    req.session.authCodeRequest = {
        redirectUri: environment.msal.redirectUri,
        code: "",
        ...authCodeRequestParams,
    };
    req.session.save();

    // Get url to sign user in and consent to scopes needed for application
    try {
        const authCodeUrlResponse = await msalInstance.getAuthCodeUrl(authCodeUrlRequest);
        res.redirect(authCodeUrlResponse);
    } catch (error) {
        next(error);
    }
};

router.get('/signin', async (req: Request, res: Response, next) => {
    // create a GUID for crsf
    req.session.csrfToken = cryptoProvider.createNewGuid();
    req.session.save();

    /**
     * The MSAL Node library allows you to pass your custom state as state parameter in the Request object.
     * The state parameter can also be used to encode information of the app's state before redirect.
     * You can pass the user's state in the app, such as the page or view they were on, as input to this parameter.
     */
    const state = cryptoProvider.base64Encode(
        JSON.stringify({
            csrfToken: req.session.csrfToken,
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
    // create a GUID for csrf
    req.session.csrfToken = cryptoProvider.createNewGuid();
    req.session.save();

    // encode the state param
    const state = cryptoProvider.base64Encode(
        JSON.stringify({
            csrfToken: req.session.csrfToken,
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
    if (req.body.state) {
        const state = JSON.parse(cryptoProvider.base64Decode(req.body.state));

        // check if csrfToken matches
        if (state.csrfToken === req.session.csrfToken) {
            if (!req.session.authCodeRequest) {
                next(new Error('authCodeRequest is missing'));
                return;
            }
            req.session.authCodeRequest.code = req.body.code; // authZ code
            req.session.authCodeRequest.codeVerifier = req.session.pkceCodes?.verifier // PKCE Code Verifier
            req.session.save();

            try {
                const tokenResponse = await msalInstance.acquireTokenByCode(req.session.authCodeRequest);
                req.session.accessToken = tokenResponse.accessToken;
                req.session.idToken = tokenResponse.idToken;
                req.session.account = tokenResponse.account;
                req.session.isAuthenticated = true;
                req.session.save();
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
    const logoutUri = `${msalConfig.auth.authority}/oauth2/v2.0/logout?post_logout_redirect_uri=${environment.msal.postLogoutRedirectUri}`;

    req.session.destroy(() => {
        res.redirect(logoutUri);
    });
});

// custom middleware to check auth state
export function isAuthenticated(req: Request, res: Response, next: (error?: unknown) => void) {
    if (!req.session.isAuthenticated) {
        console.log('isAuthenticated: false');
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }
    console.log('isAuthenticated: true');
    next();
};