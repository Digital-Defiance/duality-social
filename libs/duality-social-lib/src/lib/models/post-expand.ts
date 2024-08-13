import { model } from "mongoose";
import { IPostExpandDocument } from "../documents/post-expand";
import { ModelData } from "../schema-model-data";

export const PostExpandModel = model<IPostExpandDocument>(ModelData.PostExpand.name, ModelData.PostExpand.schema, ModelData.PostExpand.collection);