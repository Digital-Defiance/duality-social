import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { TypographyComponent } from './typography/typography.component';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: TypographyComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes),MatCardModule],
  exports: [RouterModule]
})
export class TypographyRoutingModule { }
