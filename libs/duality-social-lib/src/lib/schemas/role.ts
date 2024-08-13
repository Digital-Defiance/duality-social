import { Schema } from "mongoose";
import { IRoleDocument } from "../documents/role";
import { ModelName } from "../enumerations/model-name";

/**
 * Schema for roles
 */
export const RoleSchema = new Schema<IRoleDocument>({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: ModelName.User,
    }],
    globalAdmin: {
        type: Boolean,
        default: false,
    },
    member: {
        type: Boolean,
        default: false,
    },
});

RoleSchema.index({ name: 1 }, { unique: true });

// Add pre-save middleware for custom validation
RoleSchema.pre('save', function(next) {
    if (this.globalAdmin && this.member) {
        next(new Error('Role cannot be both globalAdmin and member'));
    }

    next();
});