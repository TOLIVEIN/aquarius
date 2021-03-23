import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Themes } from 'src/assets/theme';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    originalThemeColor = 'wisteria';
    themeColor$ = new BehaviorSubject<Themes>(Themes.wisteria);
    inspirationTag$ = new BehaviorSubject<string[]>([]);

    constructor(private snackBar: MatSnackBar) {}

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }
    changeThemeColor(themeColor: keyof typeof Themes) {
        this.themeColor$.next(Themes[themeColor]);
    }

    clearInspirationTags() {
        this.inspirationTag$.next([]);
    }
}
