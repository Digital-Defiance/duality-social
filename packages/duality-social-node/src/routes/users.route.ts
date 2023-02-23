/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import express = require('express');
import { Request, Response } from 'express';
import { fetch } from '../fetch';
import { GRAPH_ME_ENDPOINT } from '../authConfig';
import { isAuthenticated } from './auth.route';
export const router = express.Router();

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req: Request, res: Response, next: (error: unknown) => void) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sessionAny: any = req.session as any;
        res.render('id', { idTokenClaims: sessionAny.account.idTokenClaims });
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sessionAny: any = req.session as any;
        try {
            const graphResponse = await fetch(GRAPH_ME_ENDPOINT, sessionAny.accessToken);
            res.render('profile', { profile: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);