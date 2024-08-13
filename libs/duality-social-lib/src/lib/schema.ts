// file: schema.ts
// description: This file contains the schema for all models in the system
// ---------------------------------------------------------------------------------------------
import { ISchemaModels } from './interfaces/schema-models';
import { AdminUserModel } from './models/admin-user';
import { EmailTokenModel } from './models/email-token';
import { InvitationModel } from './models/invitation';
import { LoginModel } from './models/login';
import { PostModel } from './models/post';
import { PostExpandModel } from './models/post-expand';
import { PostImpressionModel } from './models/post-impression';
import { PostViewpointModel } from './models/post-viewpoint';
import { PostViewpointReactionModel } from './models/post-viewpoint-reaction';
import { PostViewpointHumanityModel } from './models/post-viewpoint-humanity';
import { ProfileModel } from './models/profile';
import { ReportModel } from './models/report';
import { RoleModel } from './models/role';
import { SudoLogModel } from './models/sudo-log';
import { UserModel } from './models/user';
import { UsernameChangeModel } from './models/username-change';

export const SchemaModels: ISchemaModels = {
  AdminUser: AdminUserModel,
  EmailToken: EmailTokenModel,
  Invitation: InvitationModel,
  Login: LoginModel,
  Post: PostModel,
  PostExpand: PostExpandModel,
  PostImpression: PostImpressionModel,
  PostViewpoint: PostViewpointModel,
  PostViewpointReaction: PostViewpointReactionModel,
  PostViewpointHumanity: PostViewpointHumanityModel,
  Profile: ProfileModel,
  Report: ReportModel,
  Role: RoleModel,
  SudoLog: SudoLogModel,
  User: UserModel,
  UsernameChange: UsernameChangeModel,
};