import { v4 as uuidv4 } from 'uuid';
import { Schema } from 'mongoose';
import validator from 'validator';
import ModelName from '../enumerations/model-name';
import { IInvitationDocument } from '../documents/invitation';


const generateRandomToken = () => {
  return uuidv4();
}

export const InvitationSchema = new Schema<IInvitationDocument>(
  {
    email: {
      type: String,
      required: false,
      optional: true,
      immutable: true,
      validate: {
        validator: async function (value: string) {
          if (!validator.isEmail(value)) {
            return false;
          }
          return true;
        },
      },
    },
    phone: { type: String, required: false, optional: true, immutable: true, validate: {
        validator: async function (value: string) {
          if (!validator.isMobilePhone(value)) {
            return false;
          }
          return true;
        }
    } },
    token: { type: String, default: generateRandomToken, required: true, immutable: true },
    maxUses: { type: Number, required: true, immutable: true },
    metadata: {
      uses: { type: Number, required: true },
      views: { type: Number, required: true },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
      immutable: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
    },
  },
  { timestamps: true }
);
