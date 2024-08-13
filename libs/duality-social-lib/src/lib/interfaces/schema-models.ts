import { Model } from 'mongoose';
import { IAdminUserDocument } from '../documents/admin-user';
import { IUserDocument } from '../documents/user';
import { IInvitationDocument } from '../documents/invitation';
import { ILoginDocument } from '../documents/login';
import { IPostDocument } from '../documents/post';
import { IPostExpandDocument } from '../documents/post-expand';
import { IPostImpressionDocument } from '../documents/post-impression';
import { IPostViewpointDocument } from '../documents/post-viewpoint';
import { IPostViewpointReactionDocument } from '../documents/post-viewpoint-reaction';
import { IProfileDocument } from '../documents/profile';
import { IReportDocument } from '../documents/report';
import { ISudoLogDocument } from '../documents/sudo-log';
import { IUsernameChangeDocument } from '../documents/username-change';
import { IPostViewpointHumanityDocument } from '../documents/post-viewpoint-humanity';
import { IRoleDocument } from '../documents/role';
import { IEmailTokenDocument } from '../documents/email-token';

export interface ISchemaModels {
    AdminUser: Model<IAdminUserDocument>;
    EmailToken: Model<IEmailTokenDocument>;
    Invitation: Model<IInvitationDocument>;
    Login: Model<ILoginDocument>;
    Post: Model<IPostDocument>;
    PostExpand: Model<IPostExpandDocument>;
    PostImpression: Model<IPostImpressionDocument>;
    PostViewpoint: Model<IPostViewpointDocument>;
    PostViewpointReaction: Model<IPostViewpointReactionDocument>;
    PostViewpointHumanity: Model<IPostViewpointHumanityDocument>;
    Profile: Model<IProfileDocument>;
    Report: Model<IReportDocument>;
    Role: Model<IRoleDocument>;
    SudoLog: Model<ISudoLogDocument>;
    User: Model<IUserDocument>;
    UsernameChange: Model<IUsernameChangeDocument>;
}