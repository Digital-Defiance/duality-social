// file: schema.ts
// description: This file contains the schema for all models in the system
// ---------------------------------------------------------------------------------------------
import { ISchemaModels } from './interfaces/schema-models.ts';
import { AdminUserModel } from './models/admin-user.ts';
import { EmailTokenModel } from './models/email-token.ts';
import { InvitationModel } from './models/invitation.ts';
import { LoginModel } from './models/login.ts';
import { PostModel } from './models/post.ts';
import { PostExpandModel } from './models/post-expand.ts';
import { PostImpressionModel } from './models/post-impression.ts';
import { PostViewpointModel } from './models/post-viewpoint.ts';
import { PostViewpointReactionModel } from './models/post-viewpoint-reaction.ts';
import { PostViewpointHumanityModel } from './models/post-viewpoint-humanity.ts';
import { ProfileModel } from './models/profile.ts';
import { ReportModel } from './models/report.ts';
import { RoleModel } from './models/role.ts';
import { SudoLogModel } from './models/sudo-log.ts';
import { UserModel } from './models/user.ts';
import { UsernameChangeModel } from './models/username-change.ts';

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