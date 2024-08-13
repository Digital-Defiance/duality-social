import { ObjectId } from "mongoose";
import { IFeedPostViewpoint } from "./feed-post-viewpoint";

export interface IFeedPost {
    id: ObjectId;
    createdAt: Date;
    createdBy: ObjectId;
    viewpoints: IFeedPostViewpoint[];
  }