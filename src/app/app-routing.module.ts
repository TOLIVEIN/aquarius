import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { InspirationComponent } from './components/inspiration/inspiration.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BaseGuard } from './guards/base.guard';

const routes: Routes = [
    {
        path: 'read',
        component: OverviewComponent,
    },
    {
        path: 'write',
        component: InspirationComponent,
        canActivate: [BaseGuard],
    },
    {
        path: 'signIn',
        component: SignInComponent,
    },
    {
        path: 'signUp',
        component: SignUpComponent,
    },
    {
        path: 'article/:id',
        component: DetailComponent,
    },
    {
        path: '**',
        redirectTo: 'read',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
