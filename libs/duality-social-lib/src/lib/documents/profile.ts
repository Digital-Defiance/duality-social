import { Document, ObjectId } from "mongoose";
import { IProfile } from "../interfaces/profile";

export interface IProfileDocument extends IProfile, Document<ObjectId, any, any> {};