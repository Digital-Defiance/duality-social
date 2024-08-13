import { model } from "mongoose";
import { IPostViewpointDocument } from "../documents/post-viewpoint";
import { ModelData } from "../schema-model-data";

export const PostViewpointModel = model<IPostViewpointDocument>(ModelData.PostViewpoint.name, ModelData.PostViewpoint.schema, ModelData.PostViewpoint.collection);