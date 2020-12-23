import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { InspirationComponent } from './components/inspiration/inspiration.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BaseGuard } from './guards/base.guard';

const routes: Routes = [
//   {
//     path: ' ',
//     redirectTo: 'signIn',
//     // component: SignInComponent,
//   },
  {
    path: 'read',
    component: OverviewComponent,
    // outlet: 'main',
  },
  {
    path: 'write',
    component: InspirationComponent,
    canActivate: [BaseGuard],
    data: {
      permission: ['admin'],
    },
    // outlet: 'main',
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
