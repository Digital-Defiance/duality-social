import { model } from "mongoose";
import { IInvitationDocument } from "../documents/invitation";
import { ModelData } from "../schema-model-data";

export const InvitationModel = model<IInvitationDocument>(ModelData.Invitation.name, ModelData.Invitation.schema, ModelData.Invitation.collection);