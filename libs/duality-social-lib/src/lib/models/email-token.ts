import { model } from "mongoose";
import { IEmailTokenDocument } from "../documents/email-token";
import { ModelData } from "../schema-model-data";

export const EmailTokenModel = model<IEmailTokenDocument>(ModelData.EmailToken.name, ModelData.EmailToken.schema, ModelData.EmailToken.collection);