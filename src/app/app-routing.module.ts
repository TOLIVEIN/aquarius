import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspirationComponent } from './components/inspiration/inspiration.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BaseGuard } from './guards/base.guard';
import { SignInGuard } from './guards/sign-in.guard';

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
        canActivate: [SignInGuard],
    },
    {
        path: 'signUp',
        component: SignUpComponent,
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
