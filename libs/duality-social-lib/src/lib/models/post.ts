import { model } from "mongoose";
import { IPostDocument } from "../documents/post";
import { ModelData } from "../schema-model-data";

export const PostModel = model<IPostDocument>(ModelData.Post.name, ModelData.Post.schema, ModelData.Post.collection);