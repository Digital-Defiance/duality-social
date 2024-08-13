import { model } from "mongoose";
import { ISudoLogDocument } from "../documents/sudo-log";
import { ModelData } from "../schema-model-data";

export const SudoLogModel = model<ISudoLogDocument>(ModelData.SudoLog.name, ModelData.SudoLog.schema, ModelData.SudoLog.collection);