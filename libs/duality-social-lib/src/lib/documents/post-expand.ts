import { Document, ObjectId } from "mongoose";
import { IPostExpand } from "../interfaces/post-expand";

export interface IPostExpandDocument extends IPostExpand, Document<ObjectId, any, any> {};