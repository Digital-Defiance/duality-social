import { model } from "mongoose";
import { IUserDocument } from "../documents/user";
import { ModelData } from "../schema-model-data";

export const UserModel = model<IUserDocument>(ModelData.User.name, ModelData.User.schema, ModelData.User.collection);