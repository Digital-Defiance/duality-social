import { model } from "mongoose";
import { IPostViewpointHumanityDocument } from "../documents/post-viewpoint-humanity";
import { ModelData } from "../schema-model-data";

export const PostViewpointHumanityModel = model<IPostViewpointHumanityDocument>(ModelData.PostViewpointHumanity.name, ModelData.PostViewpointHumanity.schema, ModelData.PostViewpointHumanity.collection);