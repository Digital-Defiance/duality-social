import { Document, ObjectId } from "mongoose";
import { IClaimedInvitation } from "../interfaces/claimed-invitation";

export interface IClaimedInvitationDocument extends IClaimedInvitation, Document<ObjectId, any, any> {};