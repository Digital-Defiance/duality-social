import { Document, ObjectId } from "mongoose";
import { IReport } from "../interfaces/report";

export interface IReportDocument extends IReport, Document<ObjectId, any, any> {};