import { Request, Response } from 'express';
import { body, param, query } from 'express-validator';
import {
  AccountStatusTypeEnum,
  AppConstants,
  EmailTokenExpiredError,
  EmailTokenUsedOrInvalidError,
  InvalidCredentialsError,
  InvalidPasswordError,
  IApiMessageResponse,
  IRequestUser,
  ITokenResponse,
  IUserResponse,
  UserModel,
  HumanityTypeEnum,
  UserNotFoundError,
  IApiUserProfileResponse,
} from '@duality-social/duality-social-lib';
import { findAuthToken } from '../../middlewares/authenticate-token.ts';
import { UserService } from '../../services/user.ts';
import { JwtService } from '../../services/jwt.ts';
import { MongooseValidationError } from '../../errors/mongoose-validation-error.ts';
import { BaseController } from '../base.ts';
import { RouteConfig } from '../../interfaces/route-config.ts';

/**
 * Controller for user-related routes
 */
export class UserController extends BaseController {
  private jwtService: JwtService;
  private userService: UserService;

  constructor() {
    super();
    this.jwtService = new JwtService();
    this.userService = new UserService();
  }

  protected getRoutes(): RouteConfig[] {
    return [
      {
        method: 'post',
        path: '/change-password',
        handler: this.changePassword,
        useAuthentication: true,
        validation: [
          body('currentPassword').notEmpty().withMessage('Current password is required'),
          body('newPassword')
            .matches(AppConstants.PasswordRegex)
            .withMessage(AppConstants.PasswordRegexError),
        ],
      },
      {
        method: 'post',
        path: '/register',
        handler: this.register,
        validation: [
          body('username')
            .matches(AppConstants.UsernameRegex)
            .withMessage(AppConstants.UsernameRegexError),
          body('email').isEmail().withMessage('Invalid email address'),
          body('password')
            .matches(AppConstants.PasswordRegex)
            .withMessage(AppConstants.PasswordRegexError),
          body('timezone').optional().isString(),
        ],
        useAuthentication: false,
      },
      {
        method: 'post',
        path: '/login',
        handler: this.login,
        validation: [
          body().custom((value, { req }) => {
            if (!req.body.username && !req.body.email) {
              throw new Error('Either username or email is required');
            }
            return true;
          }),
          body('username')
            .optional()
            .matches(AppConstants.UsernameRegex)
            .withMessage(AppConstants.UsernameRegexError),
          body('email').optional().isEmail().withMessage('Invalid email address'),
          body('password')
            .matches(AppConstants.PasswordRegex)
            .withMessage(AppConstants.PasswordRegexError),
        ],
        useAuthentication: false,
      },
      {
        method: 'get',
        path: '/refresh-token',
        handler: this.refreshToken,
        useAuthentication: true,
      },
      {
        method: 'get',
        path: '/verify-email',
        handler: this.verifyEmailToken,
        validation: [
          query('token').not().isEmpty().withMessage('Token is required'),
          query('token').isLength({ min: AppConstants.EmailTokenLength * 2, max: AppConstants.EmailTokenLength * 2 }).withMessage('Invalid token'),
        ],
        useAuthentication: false,
      },
      {
        method: 'get',
        path: '/verify',
        handler: this.tokenVerifiedResponse,
        useAuthentication: true,
      },
      {
        method: 'post',
        path: '/resend-verification',
        handler: this.resendVerification,
        validation: [
          body().custom((value, { req }) => {
            if (!req.body.username && !req.body.email) {
              throw new Error('Either username or email is required');
            }
            return true;
          }),
          body('username').optional().isString(),
          body('email').optional().isEmail(),
        ],
        useAuthentication: false,
      },
      {
        method: 'post',
        path: '/forgot-password',
        handler: this.forgotPassword,
        validation: [
          body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
        ],
        useAuthentication: false,
      },
      {
        method: 'get',
        path: '/verify-reset-token',
        handler: this.verifyResetToken,
        validation: [
          query('token').not().isEmpty().withMessage('Token is required'),
          query('token').isLength({ min: AppConstants.EmailTokenLength * 2, max: AppConstants.EmailTokenLength * 2 }).withMessage('Invalid token'),
        ],
        useAuthentication: false,
      },
      {
        method: 'post',
        path: '/reset-password',
        handler: this.resetPassword,
        validation: [
          body('token').notEmpty(),
          body('password').matches(AppConstants.PasswordRegex).withMessage(AppConstants.PasswordRegexError),
        ],
        useAuthentication: false,
      },
      {
        method: 'get',
        path: '/profile/:username',
        handler: this.getUserProfile,
        validation: [
          param('username').matches(AppConstants.UsernameRegex).withMessage(AppConstants.UsernameRegexError),
        ],
        useAuthentication: true,
      },
    ];
  }

  /**
   * Change the user's password
   * @param req 
   * @param res 
   */
  public async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.id
      if (!userId) {
        this.sendApiMessageResponse(401, { message: 'User not authenticated' } as IApiMessageResponse, res);
        return;
      }

      await this.userService.changePassword(userId, currentPassword, newPassword);
      this.sendApiMessageResponse(200, { message: 'Password changed successfully' } as IApiMessageResponse, res);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        this.sendApiMessageResponse(401, { message: 'Current password is incorrect' } as IApiMessageResponse, res);
      } else if (error instanceof InvalidPasswordError) {
        this.sendApiMessageResponse(400, { message: AppConstants.PasswordRegexError } as IApiMessageResponse, res);
      } else {
        console.error('Error changing password:', error);
        this.sendApiErrorResponse(500, 'Internal server error', error, res);
      }
    }
  }

  /**
   * Send the verify token response after authenticateToken middleware
   * @param req
   * @param res
   */
  public async tokenVerifiedResponse(req: Request, res: Response): Promise<void> {
    // If we've reached this point, the token is valid
    this.sendApiMessageResponse(200, { message: 'Token is valid', user: req.user } as IUserResponse, res);
  }

  /**
   * Refresh the JWT token
   * @param req
   * @param res
   * @returns
   */
  private async refreshToken(req: Request, res: Response) {
    try {
      const token = findAuthToken(req.headers);
      if (!token) {
        this.sendApiMessageResponse(401, { message: 'No token provided' } as IApiMessageResponse, res);
        return;
      }

      const tokenUser = await this.jwtService.verifyToken(token);

      const userDoc = await UserModel.findById(tokenUser.userId, { password: 0 });
      if (!userDoc || userDoc.accountStatusType !== AccountStatusTypeEnum.Active) {
        return res.status(403).json({ message: 'User not found or inactive' });
      }
      const { token: newToken, roles } = await this.jwtService.signToken(userDoc);

      res.header('Authorization', `Bearer ${newToken}`);
      res.status(200).json({ message: 'Token refreshed', user: this.userService.makeRequestUser(userDoc, roles) } as IUserResponse);
    } catch (error) {
      console.error('Token refresh error:', error);
      this.sendApiErrorResponse(500, 'Internal server error', error, res);
    }
  }

  /**
   * Register a new user
   * @param req
   * @param res
   * @returns
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, timezone } = req.body;

      await this.userService.newUser({
        username: username.trim(),
        email: email.trim(),
        languages: ['en'],
        timezone: timezone,
        humanityType: HumanityTypeEnum.Human,
      }, password);
      this.sendApiMessageResponse(201, { message: 'User registered successfully' } as IApiMessageResponse, res);
    } catch (error) {
      if (error instanceof MongooseValidationError) {
        this.sendApiMongoValidationErrorResponse(400, 'Validation error', error.errors, res);
      } else {
        this.sendApiErrorResponse(500, 'Internal server error', error, res);
      }
    }
  }

  /**
   * Log in a user
   * @param req
   * @param res
   * @returns
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const userDoc = await this.userService.findUser(password, email, username);

      const { token } = await this.jwtService.signToken(userDoc);

      userDoc.lastLogin = new Date();
      await userDoc.save();

      res.status(200).json({ token, message: 'Logged in successfully' } as ITokenResponse);
    } catch (error) {
      this.sendApiErrorResponse(500, 'Internal server error', error, res);
    }
  }

  /**
   * Verify an email token
   * @param req
   * @param res
   * @returns
   */
  public async verifyEmailToken(req: Request, res: Response): Promise<void> {
    const emailToken = Array.isArray(req.query.token) ? req.query.token[0] : req.query.token;

    if (typeof emailToken !== 'string' || emailToken.length !== (AppConstants.EmailTokenLength * 2)) {
      this.sendApiMessageResponse(400, { message: 'Invalid token format' } as IApiMessageResponse, res);
      return;
    }

    try {
      await this.userService.verifyEmailTokenAndFinalize(emailToken);

      this.sendApiMessageResponse(200, { message: 'Email verified successfully' } as IApiMessageResponse, res);
    } catch (error) {
      console.error('Error during email verification:', error);
      this.sendApiErrorResponse(500, 'Internal server error', error, res);
    }
  }

  /**
   * Resend the verification email
   * @param req 
   * @param res 
   */
  public async resendVerification(req: Request, res: Response): Promise<void> {
    try {
      const { username, email } = req.body;

      // Find the user
      const user = await UserModel.findOne(username ? { username } : { email });
      if (!user) {
        this.sendApiMessageResponse(404, { message: 'User not found' } as IApiMessageResponse, res);
        return;
      }

      // Resend the email token
      await this.userService.resendEmailToken(user._id.toString());

      this.sendApiMessageResponse(200, { message: 'Verification email resent successfully' } as IApiMessageResponse, res);
    } catch (error) {
      if (error instanceof EmailTokenUsedOrInvalidError) {
        this.sendApiMessageResponse(400, { message: 'No active verification token found' } as IApiMessageResponse, res);
      } else {
        console.error('Error resending verification email:', error);
        this.sendApiErrorResponse(500, 'Internal server error', error, res);
      }
    }
  }

  /**
   * Send a password reset email
   * @param req 
   * @param res 
   * @returns 
   */
  public async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const result = await this.userService.initiatePasswordReset(email);

      this.sendApiMessageResponse(result.success ? 200 : 400, { message: result.message } as IApiMessageResponse, res);
    } catch (error) {
      this.sendApiErrorResponse(500, 'An unexpected error occurred. Please try again later.', error, res);
    }
  }

  /**
   * Verify the password reset token
   * @param req 
   * @param res 
   */
  public async verifyResetToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.query;
      await this.userService.verifyEmailToken(token as string);
      this.sendApiMessageResponse(200, { message: 'Token is valid' } as IApiMessageResponse, res);
    } catch (error) {
      if (error instanceof EmailTokenExpiredError) {
        this.sendApiMessageResponse(400, { message: 'Password reset token has expired' } as IApiMessageResponse, res);
      } else if (error instanceof EmailTokenUsedOrInvalidError) {
        this.sendApiMessageResponse(400, { message: 'Invalid or already used password reset token' } as IApiMessageResponse, res);
      } else {
        this.sendApiErrorResponse(500, 'Internal server error', error, res);
      }
    }
  }

  /**
   * Reset the user's password
   * @param req 
   * @param res 
   */
  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, password } = req.body;
      const user = await this.userService.resetPassword(token, password);

      // Generate a new JWT token for the user
      const { token: newToken, roles } = await this.jwtService.signToken(user);
      const requestUser: IRequestUser = this.userService.makeRequestUser(user, roles);
      res.header('Authorization', `Bearer ${newToken}`);
      res.status(200).json({ message: 'Password reset successfully', user: requestUser } as IUserResponse);
    } catch (error) {
      if (error instanceof EmailTokenExpiredError) {
        this.sendApiMessageResponse(400, { message: 'Password reset token has expired' } as IApiMessageResponse, res);
      } else if (error instanceof EmailTokenUsedOrInvalidError) {
        this.sendApiMessageResponse(400, { message: 'Invalid or already used password reset token' } as IApiMessageResponse, res);
      } else {
        console.error('Error resetting password:', error);
        this.sendApiMessageResponse(500, { message: 'Internal server error' } as IApiMessageResponse, res);
      }
    }
  }

  /**
   * Get a user's public profile
   */
  public async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const userProfileResponse = await this.userService.getPublicUserProfile(username);

      if (!userProfileResponse) {
        this.sendApiMessageResponse(404, { message: 'User not found' } as IApiMessageResponse, res);
        return;
      }

      this.sendApiMessageResponse(200, userProfileResponse, res);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        this.sendApiMessageResponse(404, { message: 'User not found' } as IApiMessageResponse, res);
      } else {
        console.error('Error fetching user profile:', error);
        this.sendApiErrorResponse(500, 'Internal server error', error, res);
      }
    }
  }
}

export default new UserController().router;
