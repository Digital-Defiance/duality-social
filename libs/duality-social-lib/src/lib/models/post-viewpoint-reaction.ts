import { model } from "mongoose";
import { IPostViewpointReactionDocument } from "../documents/post-viewpoint-reaction";
import { ModelData } from "../schema-model-data";

export const PostViewpointReactionModel = model<IPostViewpointReactionDocument>(ModelData.PostViewpointReaction.name, ModelData.PostViewpointReaction.schema, ModelData.PostViewpointReaction.collection);