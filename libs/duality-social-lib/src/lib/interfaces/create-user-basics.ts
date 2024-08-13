/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { HumanityTypeEnum } from '../enumerations/humanity-type';

export interface ICreateUserBasics {
  username: string;
  languages: string[];
  /**
   * Whether the user is a human or a bot.
   */
  humanityType: HumanityTypeEnum,
  /**
   * The user's email address, used for login if accountType is email/password.
   * Used for sending notifications, regardless.
   */
  email: string;
  timezone?: string;
}