import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { UtilService } from 'src/app/services/util.service';
import { ConfrimDialogComponent } from '../confrim-dialog/confrim-dialog.component';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.less'],
})
export class OverviewComponent implements OnInit {
    nums = 5;
    articles!: Article[];
    editable: boolean;
    removable: boolean;
    constructor(
        private authService: AuthService,
        private dataService: DataService,
        private utilService: UtilService,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.dataService.articles$.subscribe((articles) => {
            this.articles = articles;
        });
        this.removable = this.authService.permissions.includes('admin');
        this.editable = this.authService.permissions.includes('user');
        this.authService.isSignIn.subscribe(() => {
            this.removable = (
                localStorage.getItem('permissions')?.split(',') ?? []
            ).includes('admin');
            this.editable = (
                localStorage.getItem('permissions')?.split(',') ?? []
            ).includes('user');
        });
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
        this.router.navigate(['write'], { queryParams: { id: article.id } });
        // console.log('edit: ', article);
    }
    deleteArticle(article: Article): void {
        this.dataService.deleteArticle(article).subscribe(
            (res) => {
                console.log(res);

                this.articles = this.articles.filter(
                    (tempArticle) => tempArticle.id !== article.id
                );
                this.dataService.articles = this.articles;
            },
            (err) => {
                this.utilService.openSnackBar(
                    'You can not delete this article!',
                    'OK'
                );
            }
        );
    }
    checkToken(): void {
        this.dataService.checkToken().subscribe(
            (res) => {
                // this.tags.push(...res.data);
                // if (res.code === 200) {
                //     this.isLogin =
                //         localStorage.getItem('permissions')?.includes('user') ??
                //         false;
                // }
                // console.log('login status', this.isLogin);
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

    openDialog(event: Event, article: Article): void {
        event.stopPropagation();

        const dialogRef = this.dialog.open(ConfrimDialogComponent, {
            width: '300px',
            data: {
                name: 'delete confirm',
                content: `Are you sure to delete ${article.title}?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteArticle(article);
            }
        });
    }
}
