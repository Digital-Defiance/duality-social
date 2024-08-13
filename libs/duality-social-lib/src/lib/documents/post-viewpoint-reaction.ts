import { Document, ObjectId } from "mongoose";
import { IPostViewpointReaction } from "../interfaces/post-viewpoint-reaction";

export interface IPostViewpointReactionDocument extends IPostViewpointReaction, Document<ObjectId, any, any> {};