import { model } from 'mongoose';
import { IEmailTokenDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const EmailTokenModel = model<IEmailTokenDocument>(
  ModelData.EmailToken.name,
  ModelData.EmailToken.schema,
  ModelData.EmailToken.collection,
);
