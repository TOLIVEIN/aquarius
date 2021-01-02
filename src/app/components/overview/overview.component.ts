import { Component, OnInit } from '@angular/core';
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
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getArticles();
  }
  getArticles(): void {
    this.dataService.getArticles().subscribe((res) => {
      this.articles = res.data.articles;
      console.log(res);
    });
  }
}
