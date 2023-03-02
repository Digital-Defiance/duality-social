import { Schema } from 'mongoose';

export const invitationSchema = new Schema({
    email: { type: String, required: false, null: true, readonly: true },
    phone: { type: String, required: false, null: true, readonly: true },
    code: { type: String, required: true, null: false, readonly: true },
    maxUses: { type: Number, required: true, null: false, readonly: true },
    meta: {
        uses: { type: Number, required: true, null: false, readonly: true },
        views: { type: Number, required: true, null: false, readonly: true },
    },
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
    createdById: { type: Schema.Types.ObjectId, required: true, null: false, readonly: true },
    updatedAt: { type: Date, default: Date.now, required: true, readonly: true },
    updatedById: { type: Schema.Types.ObjectId, required: true, null: false, readonly: true },
});