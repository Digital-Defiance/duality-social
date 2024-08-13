import { Document, ObjectId } from "mongoose";
import { IRole } from "../interfaces/role";

/**
 * Composite interface for role collection documents
 */
export interface IRoleDocument extends IRole, Document<ObjectId, any, any> {}