import { model } from "mongoose";
import { IRoleDocument } from "../documents/role";
import { ModelData } from "../schema-model-data";

export const RoleModel = model<IRoleDocument>(ModelData.Role.name, ModelData.Role.schema, ModelData.Role.collection);