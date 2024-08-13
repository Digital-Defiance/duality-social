import { Document, ObjectId } from "mongoose";
import { IPostViewpoint } from "../interfaces/post-viewpoint";

export interface IPostViewpointDocument extends IPostViewpoint, Document<ObjectId, any, any> {};