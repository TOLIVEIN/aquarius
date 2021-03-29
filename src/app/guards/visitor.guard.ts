import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanDeactivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UtilService } from '../services/util.service';

@Injectable({
    providedIn: 'root',
})
export class VisitorGuard implements CanActivate, CanDeactivate<unknown> {
    constructor(
        private authService: AuthService,
        private utilService: UtilService
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const permissionList = this.authService.permissions;
        let canActivate = !permissionList.includes('user');
        this.authService.isSignIn.subscribe(() => {
            canActivate = !(
                localStorage.getItem('permissions')?.split(',') ?? []
            ).includes('user');
        });
        if (!canActivate) {
            this.utilService.openSnackBar(
                'You dont have permission to do this action',
                'OK'
            );
        }
        return canActivate;
    }
    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return true;
    }
}
