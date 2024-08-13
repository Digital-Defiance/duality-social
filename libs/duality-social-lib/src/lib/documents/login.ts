import { Document, ObjectId } from "mongoose";
import { ILogin } from "../interfaces/login";

export interface ILoginDocument extends ILogin, Document<ObjectId, any, any> {};