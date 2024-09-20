export abstract class AppConstants {
  /**
   * Duration in milliseconds for which an email token is valid.
   */
  public static readonly EmailTokenExpiration = 24 * 60 * 60 * 1000;
  /**
   * Length in bytes of the email token generated (is represented as a hex string of twice as many)
   */
  public static readonly EmailTokenLength = 32;
  /**
   * Number of rounds for bcrypt hashing. Higher values increase security but also consume more CPU resources.
   */
  public static readonly BcryptRounds = 10;
  /**
   * The algorithm used to sign JWT tokens
   */
  public static readonly JwtAlgo:
    | 'HS256'
    | 'HS384'
    | 'HS512'
    | 'RS256'
    | 'RS384'
    | 'RS512'
    | 'ES256'
    | 'ES384'
    | 'ES512'
    | 'PS256'
    | 'PS384'
    | 'PS512' = 'HS256';
  /**
   * The expiration time for a JWT token in seconds
   */
  public static readonly JwtExpiration = 86400;
  /**
   * The regular expression for valid usernames.
   */
  public static readonly UsernameRegex = /^[A-Za-z0-9]{3,30}$/;
  /**
   * The error message for invalid usernames.
   */
  public static readonly UsernameRegexError =
    'Username must be 3-30 characters long and contain only letters and numbers';
  /**
   * The regular expression for valid passwords.
   */
  public static readonly PasswordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
  /**
   * The error message for invalid passwords.
   */
  public static readonly PasswordRegexError =
    'Password must be at least 8 characters long and include at least one letter, one number, and one special character (!@#$%^&*()_+-=[]{};\':"|,.<>/?)';
  /**
   * The regular expression for valid email addresses.
   */
  public static readonly EmailTokenResendInterval = 5 * 60 * 1000; // 5 minutes
  /**
   * The name of the application. This is used in various places to identify the application. For example, in emails sent to users.
   */
  public static readonly ApplicationName = 'Duality Social';
  /**
   * The email address that emails sent (registration, etc) appear to be from.
   */
  public static readonly EmailSender = 'noreply@duality.social';
  /**
   * The email address and sender name that emails sent (registration, etc) appear to be from
   */
  public static readonly EmailFrom = `${AppConstants.ApplicationName} <${AppConstants.EmailSender}>`;
  /**
   * The maximum length of a post. This is currently set to 280 characters.
   */
  public static readonly MaxPostLength = 280;
  /**
   * The maximum length of a blog post. This is currently set to 1000 characters.
   */
  public static readonly MaxBlogPostLength = 1000;
  /**
   * The maximum number of images that can be attached to a post. This is currently set to 4.
   */
  public static readonly MaxPostImages = 4;
  /**
   * The maximum size of an image that can be attached to a post.
   */
  public static readonly MaxImageSize = 5 * 1024 * 1024; // 5 MB
  /**
   * The maximum dimensions of an image that can be attached to a post.
   */
  public static readonly MaxImageDimensions = { width: 1920, height: 1080 };
}
