import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.less'],
})
export class OverviewComponent implements OnInit {
    nums = 5;
    articles!: Article[];
    constructor(
        private authService: AuthService,
        private dataService: DataService,
        private router: Router
    ) {
        // this.dataService.articles$.subscribe((articles) => {
        //     this.articles = articles;
        // });
    }

    ngOnInit(): void {
        this.checkToken();
        this.getArticles();
    }
    getArticles(): void {
        this.dataService.getArticles().subscribe((res) => {
            this.articles = res.data.articles;
            this.dataService.articles = this.articles;
            // this.dataService.articles$.next(res.data.articles);
            // console.log(res);
        });
    }
    editArticle(id?: number): void {
        console.log('edit: ', id);
    }
    deleteArticle(id?: number): void {
        console.log('delete: ', id);
    }
    checkToken(): void {
        this.dataService.checkToken().subscribe(
            (res) => {
                // this.tags.push(...res.data);
                console.log(res);
            },
            (error) => {
                if (error.error.code !== 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('permissions');
                    this.authService.isSignIn.next(false);
                    // this.router.navigate(['signIn']);
                }
            }
        );
    }
}
