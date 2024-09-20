import {
  ModelName,
  ModelNameCollection,
} from '@duality-social/duality-social-lib';
import { AdminUserSchema } from './schemas/admin-user.ts';
import { EmailTokenSchema } from './schemas/email-token.ts';
import { InvitationSchema } from './schemas/invitation.ts';
import { LoginSchema } from './schemas/login.ts';
import { PostSchema } from './schemas/post.ts';
import { PostExpandSchema } from './schemas/post-expand.ts';
import { PostImpressionSchema } from './schemas/post-impression.ts';
import { PostViewpointSchema } from './schemas/post-viewpoint.ts';
import { ProfileSchema } from './schemas/profile.ts';
import { ReportSchema } from './schemas/report.ts';
import { SudoLogSchema } from './schemas/sudo-log.ts';
import { UserSchema } from './schemas/user.ts';
import { UsernameChangeSchema } from './schemas/username-change.ts';
import { PostViewpointReactionSchema } from './schemas/post-viewpoint-reaction.ts';
import { PostViewpointHumanitySchema } from './schemas/post-viewpoint-humanity.ts';
import { ISchemaModelData } from './interfaces/schema-model-data.ts';
import { RoleSchema } from './schemas/role.ts';

function modelNameCollectionToPath(
  modelNameCollection: ModelNameCollection,
): string {
  return `/${modelNameCollection as string}`;
}

/**
 * The schema for all models in the system.
 * This includes the name, description, plural name, and api name of each model.
 */
export const ModelData: ISchemaModelData = {
  AdminUser: {
    name: ModelName.AdminUser,
    description: 'An admin user in the system.',
    collection: ModelNameCollection.AdminUser,
    schema: AdminUserSchema,
    path: modelNameCollectionToPath(ModelNameCollection.AdminUser),
  },
  EmailToken: {
    name: ModelName.EmailToken,
    description: 'An email change event.',
    collection: ModelNameCollection.EmailToken,
    schema: EmailTokenSchema,
    path: modelNameCollectionToPath(ModelNameCollection.EmailToken),
  },
  Invitation: {
    name: ModelName.Invitation,
    description: 'An invitation to join the system.',
    collection: ModelNameCollection.Invitation,
    schema: InvitationSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Invitation),
  },
  Login: {
    name: ModelName.Login,
    description: 'A login to the system.',
    collection: ModelNameCollection.Login,
    schema: LoginSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Login),
  },
  Post: {
    name: ModelName.Post,
    description: 'A post in the system containing two viewpoints.',
    collection: ModelNameCollection.Post,
    schema: PostSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Post),
  },
  PostExpand: {
    name: ModelName.PostExpand,
    description: 'A post expand event.',
    collection: ModelNameCollection.PostExpand,
    schema: PostExpandSchema,
    path: modelNameCollectionToPath(ModelNameCollection.PostExpand),
  },
  PostImpression: {
    name: ModelName.PostImpression,
    description: 'A post impression event.',
    collection: ModelNameCollection.PostImpression,
    schema: PostImpressionSchema,
    path: modelNameCollectionToPath(ModelNameCollection.PostImpression),
  },
  PostViewpoint: {
    name: ModelName.PostViewpoint,
    description: 'A post viewpoint.',
    collection: ModelNameCollection.PostViewpoint,
    schema: PostViewpointSchema,
    path: modelNameCollectionToPath(ModelNameCollection.PostViewpoint),
  },
  PostViewpointReaction: {
    name: ModelName.PostViewpointReaction,
    description: 'A reaction to a viewpoint.',
    collection: ModelNameCollection.PostViewpointReaction,
    schema: PostViewpointReactionSchema,
    path: modelNameCollectionToPath(ModelNameCollection.PostViewpointReaction),
  },
  PostViewpointHumanity: {
    name: ModelName.PostViewpointHumanity,
    description: 'A vote on the humanity of a viewpoint.',
    collection: ModelNameCollection.PostViewpointHumanity,
    schema: PostViewpointHumanitySchema,
    path: modelNameCollectionToPath(ModelNameCollection.PostViewpointHumanity),
  },
  Profile: {
    name: ModelName.Profile,
    description: 'A user profile.',
    collection: ModelNameCollection.Profile,
    schema: ProfileSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Profile),
  },
  Report: {
    name: ModelName.Report,
    description: 'A report of a post.',
    collection: ModelNameCollection.Report,
    schema: ReportSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Report),
  },
  Role: {
    name: ModelName.Role,
    description: 'A role in the system.',
    collection: ModelNameCollection.Role,
    schema: RoleSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Role),
  },
  SudoLog: {
    name: ModelName.SudoLog,
    description: 'A log of sudo events.',
    collection: ModelNameCollection.SudoLog,
    schema: SudoLogSchema,
    path: modelNameCollectionToPath(ModelNameCollection.SudoLog),
  },
  User: {
    name: ModelName.User,
    description: 'A user in the system.',
    collection: ModelNameCollection.User,
    schema: UserSchema,
    path: modelNameCollectionToPath(ModelNameCollection.User),
  },
  UsernameChange: {
    name: ModelName.UsernameChange,
    description: 'A username change event.',
    collection: ModelNameCollection.UsernameChange,
    schema: UsernameChangeSchema,
    path: modelNameCollectionToPath(ModelNameCollection.UsernameChange),
  },
};
