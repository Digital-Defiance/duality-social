import { Schema } from 'mongoose';
import { UserSchemaName } from './user';

export const sudoLogSchema = new Schema({
    /**
     * The id of the user attempting sudo.
     */
    userId: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, readonly: true },
    /**
     * The id of the admin user if the sudo attempt was successful.
     */
    adminUserId: { type: Schema.Types.ObjectId, null: true, default: null, readonly: true },
    /**
     * Whether the sudo attempt was successful.
     */
    success: { type: Boolean, required: true, readonly: true, null: false },
    createdAt: { type: Date, default: Date.now, null: false, required: true, readonly: true },
});