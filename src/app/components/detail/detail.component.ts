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
    constructor(
        private router: ActivatedRoute,
        private dataService: DataService
    ) {
        this.router.params.subscribe((params) => {
            this.id = params.id;
            this.dataService
                .getArticle(this.id)
                .subscribe((article) => console.log(article));
        });
    }

    ngOnInit(): void {
        console.log(this.router.snapshot.params);
    }
}
