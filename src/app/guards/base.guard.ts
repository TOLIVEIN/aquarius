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

@Injectable({
    providedIn: 'root',
})
export class BaseGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const permissionList = this.authService.permissions;
        let canActivate = permissionList.includes('user');
        this.authService.isSignIn.subscribe(() => {
            canActivate = (
                localStorage.getItem('permissions')?.split(',') ?? []
            ).includes('user');
        });
        return canActivate;
    }
}
