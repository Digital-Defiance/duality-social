import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { MatCardModule } from '@angular/material/card';
import { PlaygroundComponent } from '../../shared/widgets/fontAwesomePlayground/playground.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: PlaygroundComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes),MatCardModule],
  exports: [RouterModule]
})
export class TypographyRoutingModule { }
