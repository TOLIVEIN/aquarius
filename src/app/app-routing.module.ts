import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { InspirationComponent } from './components/inspiration/inspiration.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserGuard } from './guards/user.guard';
import { VisitorGuard } from './guards/visitor.guard';

const routes: Routes = [
    {
        path: 'read',
        component: OverviewComponent,
    },
    {
        path: 'write',
        component: InspirationComponent,
        canActivate: [UserGuard],
    },
    {
        path: 'signIn',
        component: SignInComponent,
        canActivate: [VisitorGuard],
    },
    {
        path: 'signUp',
        component: SignUpComponent,
        canActivate: [VisitorGuard],
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
