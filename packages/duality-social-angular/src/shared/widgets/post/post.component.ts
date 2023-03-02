import { Component, Input } from "@angular/core";
import { IPost } from "@digital-defiance/duality-social-lib";
import { Schema } from "mongoose";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
  })
export class PostComponent {
  @Input() public post: IPost;
  constructor() { 
    // empty
    this.post = {
      inputViewpointId: new Schema.Types.ObjectId(''),
      aiViewpointId: new Schema.Types.ObjectId(''),
      createdAt: new Date(),
      createdById: new Schema.Types.ObjectId(''),
      updatedAt: new Date(),
      updatedById: new Schema.Types.ObjectId(''),
      meta: {
        expands: 0,
        impressions: 0,
        reactions: 0,
        reactionsByType: {}
      }
    };
  }
}