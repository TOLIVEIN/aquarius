import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Themes } from '../../../assets/theme';
import { DataService } from '../../services/data.service';
import { UtilService } from '../../services/util.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
    title = 'Aquarius';

    activeIndex = Infinity;

    isSignIn: boolean;

    originalThemeColor: string;

    // themes = keyof typeof Themes;

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
        'cerulean',
    ];

    constructor(
        private dataService: DataService,
        private authService: AuthService,
        private router: Router,
        private utilService: UtilService
    ) {
        this.isSignIn = authService.isSignIn.value;
        this.authService.isSignIn.subscribe((data) => (this.isSignIn = data));
        this.originalThemeColor = this.utilService.originalThemeColor;
    }

    ngOnInit(): void {}

    signOut(): void {
        this.authService.signOut();
        this.router.navigate(['overview']);
    }
    changeTheme(themeColor: string, storeOriginal = false) {
        document.body.style.setProperty(
            '--theme-color',
            `var(--color-${themeColor})`
        );
        document.body.style.setProperty(
            '--theme-rgb',
            `var(--rgb-${themeColor})`
        );

        this.utilService.changeThemeColor(themeColor as keyof typeof Themes);

        if (storeOriginal) {
            this.originalThemeColor = this.utilService.originalThemeColor;
        } else {
            this.utilService.originalThemeColor = themeColor;
            this.originalThemeColor = themeColor;
        }
    }

    activateItem(index: number): void {
        this.activeIndex = index;
        this.changeTheme(this.themes[index], true);
    }

    inactivateItem(): void {
        this.activeIndex = Infinity;
        this.changeTheme(this.originalThemeColor);
    }
}
