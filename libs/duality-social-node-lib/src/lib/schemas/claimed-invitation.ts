import {
  IClaimedInvitationDocument,
  ModelName,
} from '@duality-social/duality-social-lib';
import { Schema } from 'mongoose';
import validator from 'validator';

/*
export interface IClaimedInvitation extends IHasID {
    invitation: IInvitation['_id'];
    ip: string;
    email?: string;
    code?: string;
    phone?: string;
    createdAt?: Date;
}
*/

export const ClaimedInvitationSchema = new Schema<IClaimedInvitationDocument>(
  {
    invitationId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.Invitation,
      required: true,
      immutable: true,
    },
    ip: { type: String, required: true, immutable: true },
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
    code: { type: String, required: false, optional: true, immutable: true },
    phone: {
      type: String,
      required: false,
      optional: true,
      immutable: true,
      validate: {
        validator: async function (value: string) {
          if (!validator.isMobilePhone(value)) {
            return false;
          }
          return true;
        },
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
      immutable: true,
    },
  },
  { timestamps: true },
);
