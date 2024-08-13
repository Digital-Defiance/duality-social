import { Document, ObjectId } from "mongoose";
import { IAdminUser } from "../interfaces/admin-user";

export interface IAdminUserDocument extends IAdminUser, Document<ObjectId, any, any> {};