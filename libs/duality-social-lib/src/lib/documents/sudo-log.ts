import { Document, ObjectId } from "mongoose";
import { ISudoLog } from "../interfaces/sudo-log";

export interface ISudoLogDocument extends ISudoLog, Document<ObjectId, any, any> {};