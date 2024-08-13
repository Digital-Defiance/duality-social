import { Document, ObjectId } from "mongoose";
import { IUsernameChange } from "../interfaces/username-change";

export interface IUsernameChangeDocument extends IUsernameChange, Document<ObjectId, any, any> {};