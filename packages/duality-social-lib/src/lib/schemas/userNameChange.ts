import { Schema } from 'mongoose';

export const userNameChangeSchema = new Schema({
    /**
     * The old name of the user.
     */
    oldName: { type: String, required: true, null: false, readonly: true },
    /**
     * The new name of the user.
     */
    newName: { type: String, required: true, null: false, readonly: true },
    /**
     * The date the name was changed.
     */
    createdAt: { type: Date, default: Date.now, required: true, readonly: true },
    /**
     * The id of the user changing their name.
     */
    createdBy: { type: Schema.Types.ObjectId, required: true, null: false, readonly: true },
});