import { Document, ObjectId } from "mongoose";
import { IInvitation } from "../interfaces/invitation";

export interface IInvitationDocument extends IInvitation, Document<ObjectId, any, any> {};