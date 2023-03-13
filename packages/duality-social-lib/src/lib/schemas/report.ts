import { Schema } from "mongoose";
import { ReportTypeEnum } from "../enumerations/reportType";
import { PostSchemaName } from "./post";
import { PostViewpointSchemaName } from "./postViewpoint";
import { UserSchemaName } from "./user";

export const ReportSchemaName = 'Report';
export const ReportSchema = new Schema({
    /**
     * The id of the post being reported.
     * This is the id of the post, not the viewpoint.
     */
    postId: { type: Schema.Types.ObjectId, ref: PostSchemaName, required: true, readonly: true },
    /**
     * The id of the viewpoint being reported.
     * This is the id of the viewpoint, not the post.
     * This is the viewpoint that the user is reporting.
     */
    viewpointId: { type: Schema.Types.ObjectId, ref: PostViewpointSchemaName, required: true, readonly: true },
    /**
     * The type of report.
     * This is the type of report that the user is making, eg 'spam', 'harassment', 'other'.
     */
    reportType: { type: String, enum: ReportTypeEnum, required: true, readonly: true },
    /**
     * The reason for the report, or other details.
     */
    notes: { type: String, null: true, default: null, readonly: true },
    createdById: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, readonly: true },
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
});