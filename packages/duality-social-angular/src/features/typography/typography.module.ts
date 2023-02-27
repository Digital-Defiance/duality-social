import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypographyRoutingModule } from './typography-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PlaygroundComponent } from '../../widgets/fontAwesomePlayground/playground.component';


@NgModule({
  declarations: [PlaygroundComponent],
  imports: [
    CommonModule,
    SharedModule,
    TypographyRoutingModule
  ]
})
export class TypographyModule { }
