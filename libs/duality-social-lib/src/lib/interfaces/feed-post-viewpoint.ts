import { ObjectId } from "mongoose";
import { DefaultReactionsTypeEnum } from "../enumerations/default-reactions-type";
import { HumanityTypeEnum } from "../enumerations/humanity-type";
import { ViewpointTypeEnum } from "../enumerations/viewpoint-type";
import { IFeedPost } from "./feed-post";

export interface IFeedPostViewpoint {
    id: ObjectId;
    content: string;
    rendered: string;
    translated: boolean;
    lang: string;
    metadata: {
      replies: number;
      expands: number;
      impressions: number;
      reactions: number;
      reactionsByType: { [key in DefaultReactionsTypeEnum]: number };
      humanityByType: { [key in HumanityTypeEnum]: number };
      votes: number;
    };
    type: ViewpointTypeEnum;
    createdAt: Date;
    createdBy: ObjectId;
    replies: IFeedPost[];
  }