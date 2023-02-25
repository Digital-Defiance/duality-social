import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed/feed.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [FeedComponent],
    imports: [
        CommonModule,
        FeedRoutingModule,
        SharedModule
    ]
})
export class FeedModule { }
