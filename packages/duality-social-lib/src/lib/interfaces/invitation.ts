import { Schema } from "mongoose";
import { IHasID } from "./hasId";
import { IHasSoftDelete } from "./hasSoftDelete";
import { IHasTimestamps } from "./hasTimestamps";
import { IHasUpdates } from "./hasUpdates";

export interface IInvitationMeta extends IHasUpdates {
    uses: number;
    views: number;
}

export interface Invitation extends IHasID, IHasTimestamps, IHasSoftDelete {
    email?: string;
    phone?: string;
    code?: string;
    maxUses?: number;
    meta: IInvitationMeta;
    createdById?: Schema.Types.ObjectId;
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