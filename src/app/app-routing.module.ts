import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { InspirationComponent } from './components/inspiration/inspiration.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
