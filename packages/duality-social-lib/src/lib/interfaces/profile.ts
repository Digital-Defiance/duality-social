import { PhoneResult } from "phone";
import { IHasID } from "./hasId";
import { IHasTimestamps } from "./hasTimestamps";
import { IUrlData } from "./urlData";

/**
 * Authentication object based profile
 */
export interface IProfile extends IHasID, IHasTimestamps {
    givenName?: string;
    surname?: string;
    userPrincipalName?: string;
    id?: string;
    /**
     * Copy of the raw bio without formatting, allows us to change algorithms later but still cache.
     */
    bio: string;
    /**
     * Copy of the bio with formatting, cached field.
     */
    formattedBio: string;
    /**
     * Email address shown to the public, expected to be a valid email address if filled in.
     */
    publicEmail?: string;
    emailVerified: boolean;
    publicLocation?: string;
    publicPhone?: string;
    get PublicPhone(): PhoneResult;
    phoneVerified: boolean;
    coverImage?: string;
    profileImage?: string;
    socialUrls: IUrlData[];
  };

  export type ProfileKeys = { [P in keyof IProfile]: P }[keyof IProfile];