import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  tags!: Tag[];

  removable = true;

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
    this.dataService.tag.name = tagName;
    this.dataService.tag.updatedBy = 'aries';
    this.dataService.tag.createdBy = 'aries';
    console.log(this.dataService.tag);

    // const tag = this.dataService.tag;

    this.dataService.addTag().subscribe(
      (res) => {
        this.tags.push(...res.data);
        console.log(res);
      },
      (error) => {
        if (error.error.code !== 200) {
          this.authService.getAuth().subscribe((r) => {
            localStorage.setItem('token', r.data.token);
          });
        }
      }
    );
  }

  getTags(): void {
    this.dataService.getTags().subscribe((res) => {
      this.tags = res.data.tags;
      console.log(this.tags);
    });
  }

  deleteTag(tag: Tag): void {
    this.dataService.deleteTag(tag).subscribe(
      (res) => {
        this.tags.splice(this.tags.indexOf(tag), 1);
        console.log(res);
      },
      (error) => {
        if (error.error.code !== 200) {
          this.authService.getAuth().subscribe((r) => {
            localStorage.setItem('token', r.data.token);
          });
        }
      }
    );
  }
}
