import { Document, ObjectId } from "mongoose";
import { IPost } from "../interfaces/post";

export interface IPostDocument extends IPost, Document<ObjectId, any, any> {};