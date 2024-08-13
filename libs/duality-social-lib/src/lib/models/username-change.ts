import { model } from "mongoose";
import { IUsernameChangeDocument } from "../documents/username-change";
import { ModelData } from "../schema-model-data";

export const UsernameChangeModel = model<IUsernameChangeDocument>(ModelData.UsernameChange.name, ModelData.UsernameChange.schema, ModelData.UsernameChange.collection);