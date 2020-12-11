import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { InspirationComponent } from './components/inspiration/inspiration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'read',
    component: OverviewComponent,
    // outlet: 'main',
  },
  {
    path: 'write',
    component: InspirationComponent,
    // outlet: 'main',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
