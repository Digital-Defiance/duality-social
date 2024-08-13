import { Document, ObjectId } from "mongoose";
import { IPostImpression } from "../interfaces/post-impression";

export interface IPostImpressionDocument extends IPostImpression, Document<ObjectId, any, any> {};