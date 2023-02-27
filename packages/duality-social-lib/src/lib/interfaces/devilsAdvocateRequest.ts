import { Schema } from "mongoose";

  /**
   * Request body for the devils advocate endpoint
   */
  export interface IDevilsAdvocateRequest {
    postText: string;
    postId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    images: string[];
  }