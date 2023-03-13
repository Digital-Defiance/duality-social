import { Schema } from 'mongoose';
import { UserSchemaName } from './user';

export const LoginSchemaName = 'Login';
/**
 * Represents a user logging in.
 */
export const loginSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, null: false, readonly: true },
    ip: { type: String, required: true, null: false, readonly: true },
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
});