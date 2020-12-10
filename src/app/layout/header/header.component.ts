import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  title = 'Aquarius';
  token!: string;

  tags!: TagData;
  articles!: ArticleData;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  login(): void {
    this.dataService.getAuth().subscribe((data) => {
      // console.log(data);
      this.token = data.data.token;
      console.log(this.token);
    });

    // this.dataService.getTags().subscribe((tags) => {
    //   this.tags = tags.data;
    //   console.log(this.tags);
    // });
    // this.dataService.getArticles().subscribe((articles) => {
    //   this.articles = articles.data;
    //   console.log(this.articles);
    // });
  }
}
