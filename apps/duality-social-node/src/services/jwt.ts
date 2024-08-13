import { AppConstants, InvalidTokenError, IRoleDocument, IUserDocument, RoleModel, ITokenUser } from "@duality-social/duality-social-lib";
import { sign, verify, JwtPayload, VerifyOptions } from "jsonwebtoken";
import { promisify } from 'util';
import { environment } from "../environment";

const verifyAsync = promisify<string, string | Buffer, VerifyOptions, JwtPayload | string>(verify);

export class JwtService {
  /**
   * Sign a JWT token for a user
   * @param userDoc 
   * @returns 
   */
  public async signToken(userDoc: IUserDocument): Promise<{ token: string, tokenUser: ITokenUser, roleNames: string[], roles: IRoleDocument[] }> {
    if (!userDoc._id) {
      throw new Error("User ID is required to sign JWT token");
    }
    // look for roles the user is a member of (the role contains the user id in the user's roles array)
    const roles = await RoleModel.find({ users: userDoc._id });
    const roleNames = roles.map((role) => role.name);
    const tokenUser: ITokenUser = { userId: userDoc._id.toString(), roles: roleNames };
    const token = sign(tokenUser, environment.jwtSecret, {
      algorithm: AppConstants.JwtAlgo,
      allowInsecureKeySizes: false,
      expiresIn: AppConstants.JwtExpiration,
    });
    return {
      token,
      tokenUser,
      roleNames,
      roles,
    };
  }

  /**
   * Verify a JWT token and return the user data
   * @param token 
   * @returns 
   */
  public async verifyToken(token: string): Promise<ITokenUser> {
    try {
      const decoded = await verifyAsync(token, environment.jwtSecret, {
        algorithms: [AppConstants.JwtAlgo]
      }) as JwtPayload;

      if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded && 'roles' in decoded) {
        return {
          userId: decoded.userId as string,
          roles: decoded.roles as string[]
        };
      } else {
        throw new InvalidTokenError();
      }
    } catch (error) {
      throw new InvalidTokenError();
    }
  }
}