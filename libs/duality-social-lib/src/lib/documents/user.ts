import { Document, ObjectId } from "mongoose";
import { IUser } from "../interfaces/user";

export interface IUserDocument extends IUser, Document<ObjectId, any, any> {};