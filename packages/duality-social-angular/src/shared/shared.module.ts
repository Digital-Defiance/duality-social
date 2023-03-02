import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { LayoutComponent } from './layout/layout.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { PostComponent } from './widgets/post/post.component';
import { PostViewpointComponent } from './widgets/post-viewpoint/post-viewpoint.component';
import { NewPostComponent } from './widgets/newPost/new-post.component';
import { PlaygroundComponent } from './widgets/fontAwesomePlayground/playground.component';
import { PostPreviewComponent } from './widgets/post-preview/post-preview.component';

@NgModule({
    imports: [
        RouterModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
    ],
    declarations: [
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LimitToPipe,
        LocalDatePipe,
        YesNoPipe,
        SafeHtmlPipe,
        LayoutComponent,
        NewPostComponent,
        PlaygroundComponent,
        PostComponent,
        PostPreviewComponent,
        PostViewpointComponent,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CustomMaterialModule,
        LimitToPipe,
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LocalDatePipe,
        YesNoPipe,
        SafeHtmlPipe,
        NewPostComponent,
        PlaygroundComponent,
        PostComponent,
        PostPreviewComponent,
        PostViewpointComponent,
    ]
})
export class SharedModule { }
