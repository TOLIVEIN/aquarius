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
    editArticle(event: Event, article: Article): void {
        event.stopPropagation();
        this.router.navigate(['write'], { queryParams: { id: article.id } });
        console.log('edit: ', article);
    }
    deleteArticle(event: Event, article: Article): void {
        event.stopPropagation();
        console.log('delete: ', article);
        this.dataService.deleteArticle(article).subscribe((res) => {
            console.log(res);
            this.articles = this.articles.filter(
                (tempArticle) => tempArticle.id !== article.id
            );
            this.dataService.articles = this.articles;
        });
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
