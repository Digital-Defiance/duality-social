import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed/feed.component';
import { SharedModule } from '../../shared/shared.module';
import { NewPostComponent } from '../../widgets/newPost/new-post.component';

@NgModule({
    declarations: [FeedComponent, NewPostComponent],
    imports: [
        CommonModule,
        FeedRoutingModule,
        SharedModule
    ]
})
export class FeedModule { }
