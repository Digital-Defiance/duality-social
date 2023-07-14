import { compare } from 'bcrypt';
import OAuth2Server from 'oauth2-server';
import { AccessToken } from '../models/access-token';
import { AuthorizationCode } from '../models/authorization-code';
import { Client } from '../models/client';
import { RefreshToken } from '../models/refresh-token';
import { User } from '../models/user';

export const oauth = new OAuth2Server({
    model: {
        getAccessToken: async (accessToken) => {
            return await AccessToken.findOne({ accessToken });
        },
        getClient: async (clientId, clientSecret) => {
            if (clientSecret === null) {
                return await Client.findOne({ clientId });
            }
            return await Client.findOne({ clientId, clientSecret });
        },
        saveToken: async (token, client, user) => {
            const accessToken = new AccessToken({
                accessToken: token.accessToken,
                accessTokenExpiresAt: token.accessTokenExpiresAt,
                scope: token.scope,
                client: client._id,
                user: user._id,
            });
            await accessToken.save();
            return {
                accessToken: accessToken.accessToken,
                accessTokenExpiresAt: accessToken.accessTokenExpiresAt,
                scope: accessToken.scope,
                client: { id: client._id.toString(), ...client._doc },
                user: { id: user._id.toString(), ...user._doc },
            };
        },
        getUser: async (username, password) => {
            const user = await User.findOne({ username });
            if (user && await compare(password, user.password)) {
                return user;
            }
            return null;
        },
        getRefreshToken: async (refreshToken) => {
            return await RefreshToken.findOne({ refreshToken });
        },
        getAuthorizationCode: async (authorizationCode) => {
            return await AuthorizationCode.findOne({ authorizationCode });
        },
        saveAuthorizationCode: async (code, client, user) => {
            const authorizationCode = new AuthorizationCode({
                authorizationCode: code.authorizationCode,
                expiresAt: code.expiresAt,
                redirectUri: code.redirectUri,
                scope: code.scope,
                client: client._id,
                user: user._id,
            });
            await authorizationCode.save();
            return {
                authorizationCode: authorizationCode.authorizationCode,
                expiresAt: authorizationCode.expiresAt,
                redirectUri: authorizationCode.redirectUri,
                scope: authorizationCode.scope,
                client: { id: client._id.toString(), ...client._doc },
                user: { id: user._id.toString(), ...user._doc },
            };
        },
        revokeToken: async (token) => {
            const result = await RefreshToken.deleteOne({ refreshToken: token.refreshToken });
            // The revokeToken method expects a returned boolean indicating whether the deletion was successful
            return result.deletedCount > 0;
        },
        verifyScope: async (token, scope) => {
            return token.scope === scope;
        }
    },
});

export default oauth;