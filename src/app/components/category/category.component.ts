import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  tags!: Tag[];

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {
    // this.tags = [] as Tag[];
  }

  ngOnInit(): void {
    this.getTags();
  }

  ngAfterViewInit(): void {
    // this.getTags();
  }

  addTag(tagName: string): void {
    this.dataService.tag.Name = tagName;
    this.dataService.tag.UpdatedBy = 'aries';
    this.dataService.tag.CreatedBy = 'aries';
    console.log(this.dataService.tag);

    // this.authService.getAuth().subscribe(res => {
    //   localStorage.setItem('token', res.data.token);
    //   // console.log(res);
    // });

    this.dataService.addTag().subscribe((res) => {
      console.log(res);
      // if (res.code !== 200) {
      //   this.authService.getAuth().subscribe((r) => {
      //     localStorage.setItem('token', r.data.token);
      //   });
      //   // console.log(res);
      // }
    }, (error) => {
      if (error.error.code !== 200) {
        // console.log(error);
        this.authService.getAuth().subscribe((r) => {
          localStorage.setItem('token', r.data.token);
        });
        // console.log(res);
      }
    });
  }

  getTags(): void {
    this.dataService.getTags().subscribe((res) => {
      this.tags = res.data.tags;
      // console.log(this.tags);
    });
  }

  deleteTag(tagID: string): void {
    this.authService.getAuth().subscribe((res) => {
      console.log(res);
    });

    this.dataService.deleteTag().subscribe((res) => {
      console.log(res);
    });
  }
}
