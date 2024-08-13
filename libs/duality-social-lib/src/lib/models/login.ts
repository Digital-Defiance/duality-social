import { model } from "mongoose";
import { ILoginDocument } from "../documents/login";
import { ModelData } from "../schema-model-data";

export const LoginModel = model<ILoginDocument>(ModelData.Login.name, ModelData.Login.schema, ModelData.Login.collection);