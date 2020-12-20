import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

  constructor(private authService: AuthService, private dataService: DataService) {
  }

  ngOnInit(): void {
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

}
