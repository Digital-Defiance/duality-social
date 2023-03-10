import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { ProfileComponent } from '../profile/profile.component';
// import { ProfileComponent } from '../profile/profile.component';
// import { HomeComponent } from '../home/home.component';
// import { FailedComponent } from '../failed/failed.component';
// import { AuthGuard } from '../core/guards/auth.guard';

// export const routes: Routes = [
//   {
//     path: 'profile',
//     component: ProfileComponent,
//     canActivate: [MsalGuard]
//   },
//   {
//     path: '',
//     component: HomeComponent
//   },
//   {
//     path: 'login-failed',
//     component: FailedComponent
//   }
// ];

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'feed',
    loadChildren: () => import('../features/feed/feed.module').then(m => m.FeedModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('../features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('../features/users/users.module').then(m => m.UsersModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('../features/account/account.module').then(m => m.AccountModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'icons',
    loadChildren: () => import('../features/icons/icons.module').then(m => m.IconsModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'playground',
    loadChildren: () => import('../features/typography/typography.module').then(m => m.TypographyModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('../features/about/about.module').then(m => m.AboutModule),
    canActivate: [MsalGuard]
  },
  {
    path: '**',
    redirectTo: 'feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    // Don't perform initial navigation in iframes or popups
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
