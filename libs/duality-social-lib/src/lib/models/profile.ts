import { model } from "mongoose";
import { IProfileDocument } from "../documents/profile";
import { ModelData } from "../schema-model-data";

export const ProfileModel = model<IProfileDocument>(ModelData.Profile.name, ModelData.Profile.schema, ModelData.Profile.collection);