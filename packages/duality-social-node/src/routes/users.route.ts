/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import express = require('express');
import { Request, Response } from 'express';
import { fetch } from '../fetch';
import { isAuthenticated } from './auth.route';
import { environment } from '../environment';
export const router = express.Router();

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req: Request, res: Response, next: (error: unknown) => void) {
        if (!req.session || !req.session.account) {
            next(new Error('Session not found'));
            return;
        }
        res.render('id', { idTokenClaims: req.session.account.idTokenClaims });
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch(environment.msal.graphMeEndpoint, req.session?.accessToken ?? '');
            res.render('profile', { profile: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);