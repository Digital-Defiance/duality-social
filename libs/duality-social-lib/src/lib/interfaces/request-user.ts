import { IRoleDocument } from "../documents/role";
import { HumanityTypeEnum } from "../enumerations/humanity-type";

/**
 * Interface for the user object stored in the request object
 */
export interface IRequestUser {
  /**
   * The ID of the user
   */
  id: string;
  /**
   * The roles associated with the user
   */
  roles: IRoleDocument[];
  /**
   * The username of the user
   */
  username: string;
  /**
   * The email address of the user
   */
  email: string;
  /**
   * The timezone of the user
   */
  timezone: string;
  /**
   * The languages the user reads/desires posts in
   * In order of preference
   */
  languages: string[];
  /**
   * The humanity type of the user (human, bot, or AI)
   */
  humanityType: HumanityTypeEnum;
  /**
   * The date the user last logged in
   */
  lastLogin?: Date;
  /**
   * Whether the user has verified their email address
   */
  emailVerified: boolean;
}