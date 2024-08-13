import { model } from "mongoose";
import { IReportDocument } from "../documents/report";
import { ModelData } from "../schema-model-data";

export const ReportModel = model<IReportDocument>(ModelData.Report.name, ModelData.Report.schema, ModelData.Report.collection);