import { Schema } from "mongoose";

/**
 * Response body for the devils advocate endpoint
 */
export interface IDevilsAdvocateResponse {
    postId: Schema.Types.ObjectId;
    aiPostText: string;
    images: string[];
  }