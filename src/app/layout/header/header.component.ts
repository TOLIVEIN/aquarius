import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
    title = 'Aquarius';

    isSignIn: boolean;

    constructor(
        private dataService: DataService,
        private authService: AuthService,
        private router: Router
    ) {
        this.isSignIn = authService.isSignIn.value;
        this.authService.isSignIn.subscribe((data) => (this.isSignIn = data));
    }

    ngOnInit(): void {}

    signOut(): void {
        this.authService.signOut();
        this.router.navigate(['overview']);
    }
}
