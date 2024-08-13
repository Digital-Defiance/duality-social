import { Schema } from "mongoose";

/**
 * Base interface for role collection documents
 */
export interface IRole {
    /**
     * The name of the role
     */
    name: string;
    /**
     * The IDs of the users associated with the role
     */
    users: Schema.Types.ObjectId[];
    /**
     * Whether the role is a globalAdmin
     * Must not specify member, fund, fundMember, or fundAdmin
     */
    globalAdmin: boolean;
    /**
     * Whether the role is a site member
     * Must not specify globalAdmin, member, fund, fundMember, or fundAdmin
     */
    member: boolean;
}