import { NextFunction, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { JwtService } from '../services/jwt.ts';
import { RequestUserService } from '../services/request-user.ts';
import {
  AccountStatusTypeEnum,
  IRoleDocument,
  ITokenUser,
} from '@duality-social/duality-social-lib';
import { RoleModel, UserModel } from '@duality-social/duality-social-node-lib';

export function findAuthToken(headers: IncomingHttpHeaders): string | null {
  const authHeader = headers['Authorization'] || headers['authorization'];
  if (authHeader && typeof authHeader === 'string') {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      return parts[1];
    }
  }
  return null;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = findAuthToken(req.headers);
  if (token == null) {
    return res.status(401).send('No token provided');
  }

  const jwtService: JwtService = new JwtService();
  jwtService
    .verifyToken(token)
    .then((user: ITokenUser) => {
      UserModel.findById(user.userId, { password: 0 })
        .then((userDoc) => {
          if (
            !userDoc ||
            userDoc.accountStatusType !== AccountStatusTypeEnum.Active
          ) {
            return res.status(403).send('User not found or inactive');
          }
          RoleModel.find({ users: userDoc._id })
            .then((roles: IRoleDocument[]) => {
              req.user = RequestUserService.makeRequestUser(userDoc, roles);
              next();
            })
            .catch((err) => {
              console.error('Error finding roles:', err);
              return res.status(500).send('Internal server error');
            });
        })
        .catch((err) => {
          console.error('Error finding user:', err);
          return res.status(500).send('Internal server error');
        });
    })
    .catch((err) => {
      console.error('Error verifying token:', err);
      return res.status(403).send('Invalid token');
    });
}
