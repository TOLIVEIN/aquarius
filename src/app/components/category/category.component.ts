import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit, AfterViewInit {
  tags!: Tag[];

  constructor(private authService: AuthService, private dataService: DataService) {
    // this.tags = [] as Tag[];
  }

  ngOnInit(): void {
    // this.getTags();
  }

  ngAfterViewInit(): void {
    this.getTags();
  }

  addTag(tagName: string): void {
    this.dataService.tag.name = tagName;
    this.dataService.tag.updatedBy = 'aries';
    this.dataService.tag.createdBy = 'aries';
    console.log(this.dataService.tag);

    this.authService.getAuth().subscribe(res => {
      console.log(res);
    });

    this.dataService.addTag().subscribe(res => {
      console.log(res);
    });
  }

  getTags(): void {
    this.dataService.getTags().subscribe(res => {
      this.tags = res.data.tags;
      console.log(this.tags);
    });
  }

  deleteTag(tagID: string): void {
    this.authService.getAuth().subscribe(res => {
      console.log(res);
    });

    this.dataService.deleteTag().subscribe(res => {
      console.log(res);
    });
  }

}
