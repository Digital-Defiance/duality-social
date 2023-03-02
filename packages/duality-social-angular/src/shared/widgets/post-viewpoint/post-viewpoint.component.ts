import { Component, Input, ViewEncapsulation } from "@angular/core";
import { HumanityType, IPostViewpoint } from "@digital-defiance/duality-social-lib";
import { Schema } from "mongoose";

@Component({
    selector: 'app-post-viewpoint',
    templateUrl: './post-viewpoint.component.html',
    styleUrls: ['./post-viewpoint.component.css'],
    encapsulation: ViewEncapsulation.None,
  })
export class PostViewpointComponent {
  @Input() public viewpoint: IPostViewpoint;
  constructor() { 
    // empty
    this.viewpoint = {
      postId: new Schema.Types.ObjectId(''),
      parentViewpointId: new Schema.Types.ObjectId(''),
      humanityType: HumanityType.Bot,
      content: '',
      createdAt: new Date(),
      createdById: new Schema.Types.ObjectId(''),
      updatedAt: new Date(),
      updatedById: new Schema.Types.ObjectId(''),
      deletedAt: new Date(),
      meta: {
        expands: 0,
        impressions: 0,
        reactions: 0,
        reactionsByType: {}
      }
    };
  }
}