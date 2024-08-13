import { Document, ObjectId } from "mongoose";
import { IPostViewpointHumanity } from "../interfaces/post-viewpoint-humanity";

export interface IPostViewpointHumanityDocument extends IPostViewpointHumanity, Document<ObjectId, any, any> {};