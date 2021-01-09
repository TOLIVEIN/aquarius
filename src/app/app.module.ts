// import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { DetailComponent } from './components/detail/detail.component';
import { InspirationComponent } from './components/inspiration/inspiration.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SelectTagComponent } from './components/select-tag/select-tag.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function tokenGetter(): string | null {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainComponent,
        OverviewComponent,
        DetailComponent,
        InspirationComponent,
        CategoryComponent,
        SignInComponent,
        SignUpComponent,
        SelectTagComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        EditorModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatAutocompleteModule,

        //  HighlightModule
        JwtModule.forRoot({
            config: {
                tokenGetter,
                allowedDomains: ['localhost:4000'],
                disallowedRoutes: ['localhost:4000/api/auth'],
            },
        }),
    ],
    providers: [
        // BaseGuard
        // {
        //   provide: HIGHLIGHT_OPTIONS,
        //   useValue: {
        //     fullLibraryLoader: () => import('highlight.js'),
        //   },
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
