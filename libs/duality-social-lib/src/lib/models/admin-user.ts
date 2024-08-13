import { model } from "mongoose";
import { IAdminUserDocument } from "../documents/admin-user";
import { ModelData } from "../schema-model-data";

export const AdminUserModel = model<IAdminUserDocument>(ModelData.AdminUser.name, ModelData.AdminUser.schema, ModelData.AdminUser.collection);