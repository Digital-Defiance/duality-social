import { Schema } from 'mongoose';
import { UserSchemaName } from './user';

export const InvitationSchemaName = 'Invitation';
export const invitationSchema = new Schema({
    email: { type: String, required: false, null: true, readonly: true },
    phone: { type: String, required: false, null: true, readonly: true },
    code: { type: String, required: true, null: false, readonly: true },
    maxUses: { type: Number, required: true, null: false, readonly: true },
    meta: {
        uses: { type: Number, required: true, null: false, readonly: false },
        views: { type: Number, required: true, null: false, readonly: false },
    },
    createdById: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, null: false, readonly: true },
    updatedById: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true, null: false, readonly: true },
},{ timestamps: true });