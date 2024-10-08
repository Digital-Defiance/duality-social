import {
  HumanityTypeEnum,
  IPostViewpointHumanityDocument,
  ModelName,
} from '@duality-social/duality-social-lib';
import { Schema } from 'mongoose';

export const PostViewpointHumanitySchema =
  new Schema<IPostViewpointHumanityDocument>(
    {
      viewpointId: {
        type: Schema.Types.ObjectId,
        ref: ModelName.PostViewpoint,
        required: true,
        immutable: true,
      },
      humanity: {
        type: String,
        required: true,
        enum: Object.values(HumanityTypeEnum),
        immutable: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: ModelName.User,
        required: true,
        immutable: true,
      },
    },
    { timestamps: true },
  );
