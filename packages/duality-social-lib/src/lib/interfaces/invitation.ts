import { Schema } from "mongoose";
import { IHasID } from "./hasId";

export interface IInvitationMeta {
    uses: number;
    views: number;
}

export interface Invitation extends IHasID {
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

export interface IClaimedInvitation extends IHasID {
    invitationId: Schema.Types.ObjectId;
    ip: string;
    email?: string;
    code?: string;
    phone?: string;
    createdAt?: Date;
}