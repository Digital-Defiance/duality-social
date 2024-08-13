import { model } from "mongoose";
import { IPostImpressionDocument } from "../documents/post-impression";
import { ModelData } from "../schema-model-data";

export const PostImpressionModel = model<IPostImpressionDocument>(ModelData.PostImpression.name, ModelData.PostImpression.schema, ModelData.PostImpression.collection);