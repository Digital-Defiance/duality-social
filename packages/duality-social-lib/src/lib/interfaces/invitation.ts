import { Schema } from "mongoose";

export interface IInvitationMeta {
    uses: number;
    views: number;
}

export interface Invitation {
    _id?: Schema.Types.ObjectId;
    email?: string;
    phone?: string;
    code?: string;
    maxUses?: number;
    meta: IInvitationMeta;
    createdAt?: Date;
    createdById?: Schema.Types.ObjectId;
    updatedAt?: Date;
    updatedById?: Schema.Types.ObjectId;
}

export interface IClaimedInvitation {
    _id?: Schema.Types.ObjectId;
    invitationId: Schema.Types.ObjectId;
    ip: string;
    email?: string;
    code?: string;
    phone?: string;
    createdAt?: Date;
}