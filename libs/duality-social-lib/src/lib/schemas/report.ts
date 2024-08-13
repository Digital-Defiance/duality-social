import { Schema } from 'mongoose';
import { ReportTypeEnum } from '../enumerations/report-type';
import ModelName from '../enumerations/model-name';
import { IReportDocument } from '../documents/report';

export const ReportSchema = new Schema<IReportDocument>({
  /**
   * The id of the post being reported.
   * This is the id of the post, not the viewpoint.
   */
  postId: {
    type: Schema.Types.ObjectId,
    ref: ModelName.Post,
    required: true,
    immutable: true,
  },
  /**
   * The id of the viewpoint being reported.
   * This is the id of the viewpoint, not the post.
   * This is the viewpoint that the user is reporting.
   */
  viewpointId: {
    type: Schema.Types.ObjectId,
    ref: ModelName.PostViewpoint,
    required: true,
    immutable: true,
  },
  /**
   * The type of report.
   * This is the type of report that the user is making, eg 'spam', 'harassment', 'other'.
   */
  reportType: {
    type: String,
    enum: Object.values(ReportTypeEnum),
    required: true,
    immutable: true,
  },
  /**
   * The reason for the report, or other details.
   */
  notes: { type: String, optional: true, immutable: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: ModelName.User,
    required: true,
    immutable: true,
  },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
});