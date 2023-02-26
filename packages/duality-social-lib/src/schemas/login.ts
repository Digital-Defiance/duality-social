import { Schema } from 'mongoose';

export const loginSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, null: false, readonly: true },
    ip: { type: String, required: true, null: false, readonly: true },
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
});