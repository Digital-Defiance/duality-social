import { ObjectId } from "mongoose";

export interface IClaimedInvitation {
    invitationId: ObjectId;
    ip: string;
    email?: string;
    code?: string;
    phone?: string;
    createdAt?: Date;
}