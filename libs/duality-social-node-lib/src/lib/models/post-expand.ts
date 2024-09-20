import { model } from 'mongoose';
import { IPostExpandDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const PostExpandModel = model<IPostExpandDocument>(
  ModelData.PostExpand.name,
  ModelData.PostExpand.schema,
  ModelData.PostExpand.collection,
);
