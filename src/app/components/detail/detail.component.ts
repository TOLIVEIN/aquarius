import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit {
    id!: string;
    article!: Article;
    constructor(
        private router: ActivatedRoute,
        private dataService: DataService
    ) {
        this.router.params.subscribe((params) => {
            this.id = params.id;
            this.article = this.dataService.articles.filter(
                (article) => article.id?.toString() === this.id
            )[0];
        });
    }

    ngOnInit(): void {
        console.log(this.router.snapshot.params);
    }
}
