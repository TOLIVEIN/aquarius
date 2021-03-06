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

    themes = [
        'turquoise',
        'emerald',
        'peter-river',
        'amethyst',
        'wet-asphalt',
        'green-sea',
        'nephritis',
        'belize-hole',
        'wisteria',
        'midnight-blue',
        'sun-flower',
        'carrot',
        'alizarin',
        'clouds',
        'concrete',
        'orange',
        'pumpkin',
        'pomeganate',
        'silver',
        'asberstos',
    ];

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
    changeTheme(themeColor: string) {
        document.body.style.setProperty(
            '--theme-color',
            `var(--color-${themeColor})`
        );
        document.body.style.setProperty(
            '--theme-rgb',
            `var(--rgb-${themeColor})`
        );
    }
}
