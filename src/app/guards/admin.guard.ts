import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UtilService } from '../services/util.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private utilService: UtilService,
        private router: Router
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
        let canActivate = permissionList.includes('admin');
        this.authService.isSignIn.subscribe(() => {
            canActivate = (
                localStorage.getItem('permissions')?.split(',') ?? []
            ).includes('admin');
        });
        if (!canActivate) {
            this.utilService.openSnackBar(
                'You dont have permission to do this action',
                'OK'
            );
        }
        return canActivate;
    }
}
