import { MailDataRequired, MailService } from '@sendgrid/mail';
import { environment } from '../environment';
import { AccountDeletedError, AccountLockedError, AccountStatusError, AccountStatusTypeEnum, AppConstants, EmailInUseError, EmailTokenExpiredError, EmailTokenModel, EmailTokenSentTooRecentlyError, EmailTokenType, EmailTokenUsedOrInvalidError, EmailVerifiedError, IEmailTokenDocument, InvalidCredentialsError, InvalidPasswordError, InvalidTokenError, InvalidUsernameError, IRequestUser, IRoleDocument, IUser, IUserDocument, ICreateUserBasics, LockTypeEnum, PendingEmailVerificationError, UserModel, UsernameInUseError, UsernameOrEmailRequiredError, UserNotFoundError, IProfileDocument, ProfileModel, IProfile } from '@duality-social/duality-social-lib';
import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';
import { MongooseValidationError } from '../errors/mongoose-validation-error';

export class UserService {
  private sendgridClient: MailService;
  constructor() {
    this.sendgridClient = new MailService();
    this.sendgridClient.setApiKey(environment.sendgridKey);
  }

  /**
   * Create a new email token to send to the user for email verification
   * @param userDoc 
   * @returns 
   */
  public async createEmailToken(userDoc: IUserDocument, type: EmailTokenType): Promise<IEmailTokenDocument> {
    // delete any expired tokens for the same user and email to prevent index constraint conflicts
    await EmailTokenModel.deleteMany({ userId: userDoc.id, email: userDoc.email, expiresAt: { $lt: new Date() } });
    const emailToken: IEmailTokenDocument = await EmailTokenModel.create({
      userId: userDoc.id,
      type: type,
      email: userDoc.email,
      token: randomBytes(AppConstants.EmailTokenLength).toString('hex'),
      lastSent: null,
      createdAt: Date.now(),
      expiresAt: new Date(Date.now() + AppConstants.EmailTokenExpiration),
    });
    return emailToken;
  }

  /**
   * Send an email token to the user for email verification
   * @param token 
   */
  public async sendEmailToken(emailToken: IEmailTokenDocument): Promise<void> {
    if (emailToken.lastSent && emailToken.lastSent.getTime() + AppConstants.EmailTokenResendInterval > Date.now()) {
      throw new EmailTokenSentTooRecentlyError(emailToken.lastSent);
    }
    const verifyUrl = `${environment.serverUrl}/verify-email?token=${emailToken.token}`;
    const passwordUrl = `${environment.serverUrl}/forgot-password?token=${emailToken.token}`;
    let msg: MailDataRequired;
    switch (emailToken.type) {
      case EmailTokenType.AccountVerification:
        msg = {
          to: emailToken.email,
          from: environment.emailSender,
          subject: `${AppConstants.ApplicationName} email confirmation`,
          text: `Please click the link below to confirm your email.\r\n\r\n${verifyUrl}`,
          html: `<p>Please click the link below to confirm your email.</p><br/><p><a href="${verifyUrl}">${verifyUrl}</a></p><p>Link expires in ${AppConstants.EmailTokenResendInterval / 1000} minutes.</p>`,
        }
        break;
      case EmailTokenType.PasswordReset:
        msg = {
          to: emailToken.email,
          from: environment.emailSender,
          subject: `${AppConstants.ApplicationName} password reset`,
          text: `Please click the link below to reset your password.\r\n\r\n${passwordUrl}`,
          html: `<p>Please click the link below to reset your password.</p><br/><p><a href="${passwordUrl}">${passwordUrl}</a></p><p>Link expires in ${AppConstants.EmailTokenResendInterval / 1000} minutes.</p>`,
        }
        break;
      default:
        throw new InvalidTokenError();
    }
    try {
      await this.sendgridClient.send(msg);
      console.log(`Email token sent to ${emailToken.email}`);
      // update lastSent/expiration
      emailToken.lastSent = new Date();
      emailToken.expiresAt = new Date(Date.now() + AppConstants.EmailTokenExpiration);
      await emailToken.save();
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  /**
   * Find a user by their email or username and password.
   * @param password 
   * @param email 
   * @param username 
   * @returns 
   */
  public async findUser(password: string, email?: string, username?: string): Promise<IUserDocument> {
    let userDoc: IUserDocument | null;

    if (username) {
      userDoc = await UserModel.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    } else if (email) {
      userDoc = await UserModel.findOne({ email: email.toLowerCase() });
    } else {
      // This should never happen due to our validation, but it's good to have as a fallback
      throw new UsernameOrEmailRequiredError();
    }

    if (!userDoc) {
      throw new InvalidCredentialsError();
    }

    const isMatch = await compare(password, userDoc.password);
    if (!isMatch) {
      throw new InvalidCredentialsError();
    }

    switch (userDoc.accountStatusType) {
      case AccountStatusTypeEnum.Active:
        break;
      case AccountStatusTypeEnum.Locked:
        throw new AccountLockedError();
      case AccountStatusTypeEnum.NewUnverified:
        throw new PendingEmailVerificationError();
      case AccountStatusTypeEnum.AdminDelete:
      case AccountStatusTypeEnum.SelfDelete:
      case AccountStatusTypeEnum.SelfDeleteWaitPeriod:
        throw new AccountDeletedError();
      default:
        throw new AccountStatusError(userDoc.accountStatusType);
    }

    return userDoc;
  }

  /**
   * Fill in the default values to a user object
   * @param newUser 
   * @returns 
   */
  public fillUserDefaults(newUser: ICreateUserBasics): IUser {
    return {
      timezone: 'UTC',
      ...newUser,
      email: newUser.email.toLowerCase(),
      emailVerified: false,
      accountStatusType: AccountStatusTypeEnum.NewUnverified,
      lockStatus: LockTypeEnum.PendingEmailVerification,
      shadowBan: false,
      userHidden: false,
      metadata: {
        totalPosts: 0,
        totalReplies: 0,
        totalReactions: 0,
        totalReactionsReceived: 0,
        totalVotes: 0,
        totalVotesReceived: 0,
        totalProfileViewsReceived: 0,
        totalPostViewsReceived: 0,
        totalReplyViewsReceived: 0,
      }
    } as IUser;
  }

  /**
   * Create a new user document from an IUser and unhashed password
   * @param newUser 
   * @param password Unhashed password
   * @returns 
   */
  public async makeUserDoc(newUser: IUser, password: string): Promise<IUserDocument> {
    const hashedPassword = await hash(password, AppConstants.BcryptRounds);
    const newUserData: IUser = {
      ...newUser,
      password: hashedPassword,
    } as IUser;
    const newUserDoc: IUserDocument = new UserModel(newUserData);
    
    const validationError = newUserDoc.validateSync();
    if (validationError) {
      throw new MongooseValidationError(validationError.errors);
    }

    return newUserDoc;
  }

  /**
   * Create a new user
   * @param username 
   * @param email 
   * @param password 
   * @param timezone 
   * @returns 
   */
  public async newUser(userData: ICreateUserBasics, password: string): Promise<IUserDocument> {
    if (!AppConstants.UsernameRegex.test(userData.username)) {
      throw new InvalidUsernameError();
    }

    if (!AppConstants.PasswordRegex.test(password)) {
      throw new InvalidPasswordError();
    }

    const existingEmailCount = await UserModel.countDocuments({ email: userData.email.toLowerCase() });
    if (existingEmailCount > 0) {
      throw new EmailInUseError();
    }

    const existingUsernameCount = await UserModel.countDocuments({
      username: { $regex: new RegExp(`^${userData.username}$`, 'i') }
    });
    if (existingUsernameCount > 0) {
      throw new UsernameInUseError();
    }

    const newUser: IUserDocument = await this.makeUserDoc(this.fillUserDefaults(userData), password);
    await newUser.save();

    await ProfileModel.create({
      userId: newUser._id,
      bio: '',
      formattedBio: '',
      socialUrls: [],
      defaultDepth: 0,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IProfile);

    const emailToken = await this.createEmailToken(newUser, EmailTokenType.AccountVerification);
    try {
      await this.sendEmailToken(emailToken);
    }
    catch (error) {
      console.error('Error sending verification email:', error);
    }
    return newUser;
  }

  /**
   * Re-send a previously sent email token
   * @param userId 
   */
  public async resendEmailToken(userId: string): Promise<void> {
    const now = new Date();
    const minLastSentTime = new Date(now.getTime() - AppConstants.EmailTokenResendInterval);

    // look up the most recent email token for a given user, then send it
    const emailToken: IEmailTokenDocument | null = await EmailTokenModel.findOne({
      userId,
      expiresAt: { $gt: now },
      $or: [
        { lastSent: null },
        { lastSent: { $lte: minLastSentTime } }
      ]
    }).sort({ createdAt: -1 }).limit(1);

    if (!emailToken) {
      throw new EmailTokenUsedOrInvalidError();
    }

    await this.sendEmailToken(emailToken);
  }

  /**
   * Verifies an email token is valid and unexpired
   * @param emailToken 
   * @returns 
   */
  public async verifyEmailToken(emailToken: string): Promise<boolean> {
    const token: IEmailTokenDocument | null = await EmailTokenModel.findOne({ token: emailToken });

    if (!token) {
      throw new EmailTokenUsedOrInvalidError();
    }

    if (token.expiresAt < new Date()) {
      await EmailTokenModel.deleteOne({ _id: token._id });
      throw new EmailTokenExpiredError();
    }

    return true;
  }

  /**
   * Verify the email token and update the user's account status
   * @param emailToken 
   */
  public async verifyEmailTokenAndFinalize(emailToken: string): Promise<void> {
    const token: IEmailTokenDocument | null = await EmailTokenModel.findOne({ token: emailToken });

    if (!token) {
      throw new EmailTokenUsedOrInvalidError();
    }

    if (token.expiresAt < new Date()) {
      await EmailTokenModel.deleteOne({ _id: token._id });
      throw new EmailTokenExpiredError();
    }

    const user: IUserDocument | null = await UserModel.findById(token.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.lockStatus !== LockTypeEnum.PendingEmailVerification || user.emailVerified) {
      throw new EmailVerifiedError();
    }

    user.emailVerified = true;
    user.lockStatus = LockTypeEnum.Unlocked;
    await user.save();

    // Delete the token after successful verification
    await EmailTokenModel.deleteOne({ _id: token._id });
  }

  /**
   * Change the user's password
   * @param userId 
   * @param currentPassword 
   * @param newPassword 
   */
  public async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user: IUserDocument | null = await UserModel.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      throw new InvalidCredentialsError();
    }

    if (!AppConstants.PasswordRegex.test(newPassword)) {
      throw new InvalidPasswordError();
    }

    const hashedPassword = await hash(newPassword, AppConstants.BcryptRounds);
    user.password = hashedPassword;
    await user.save();
  }

  /**
   * Given a user document and an array of role documents, create the IRequestUser
   * @param userDoc 
   * @param roles 
   * @returns 
   */
  public makeRequestUser(userDoc: IUserDocument, roles: IRoleDocument[]): IRequestUser {
    if (!userDoc._id) {
      throw new Error("User document is missing _id");
    }
    const requestUser: IRequestUser = {
      id: userDoc._id.toString(),
      roles: roles,
      email: userDoc.email,
      username: userDoc.username,
      languages: userDoc.languages,
      humanityType: userDoc.humanityType,
      timezone: userDoc.timezone,
      lastLogin: userDoc.lastLogin,
      emailVerified: userDoc.emailVerified,
    };
    return requestUser;
  }

  /**
   * Create a password reset record and send a password reset link
   * @param email 
   * @returns 
   */
  public async initiatePasswordReset(email: string): Promise<{ success: boolean, message: string }> {
    try {
      const user = await UserModel.findOne({ email: email.toLowerCase() });
      if (!user) {
        // We don't want to reveal whether an email exists in our system
        return { success: true, message: 'If an account with that email exists, a password reset link has been sent.' };
      }

      // Check if the user's email is not verified
      if (!user.emailVerified) {
        return { success: false, message: 'Please verify your email address before resetting your password.' };
      }

      // Create and send password reset token
      const emailToken = await this.createEmailToken(user, EmailTokenType.PasswordReset);
      await this.sendEmailToken(emailToken);

      return { success: true, message: 'Password reset link has been sent to your email.' };
    } catch (error) {
      console.error('Error in initiatePasswordReset:', error);
      return { success: false, message: 'An unexpected error occurred. Please try again later.' };
    }
  }

  /**
   * Check if the given token is a valid email token for password reset
   * @param token 
   * @returns 
   */
  public async validatePasswordResetToken(token: string): Promise<IEmailTokenDocument> {
    const emailToken = await EmailTokenModel.findOne({ token, type: EmailTokenType.PasswordReset });
    if (!emailToken) {
      throw new Error('Invalid or expired password reset token');
    }
    if (emailToken.expiresAt < new Date()) {
      await EmailTokenModel.deleteOne({ _id: emailToken._id });
      throw new Error('Password reset token has expired');
    }
    return emailToken;
  }

  /**
   * Reset a user's password given a valid token
   * @param token 
   * @param password 
   * @returns 
   */
  public async resetPassword(token: string, password: string): Promise<IUserDocument> {
    const emailToken = await EmailTokenModel.findOne({
      token,
      type: EmailTokenType.PasswordReset,
      expiresAt: { $gt: new Date() }
    });

    if (!emailToken) {
      throw new EmailTokenUsedOrInvalidError();
    }

    const user = await UserModel.findById(emailToken.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    // Hash the new password
    const hashedPassword = await hash(password, AppConstants.BcryptRounds);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the used token
    await EmailTokenModel.deleteOne({ _id: emailToken._id });

    return user;
  }
}