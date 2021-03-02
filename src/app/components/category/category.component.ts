import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.less'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
    @ViewChild('tag')
    tagRef!: ElementRef;

    tags!: Tag[];

    removable: boolean;

    constructor(
        private authService: AuthService,
        private dataService: DataService,
        private router: Router
    ) {
        this.removable = this.authService.permissions.includes('admin');
        this.authService.isSignIn.subscribe(() => {
            this.removable = (
                localStorage.getItem('permissions')?.split(',') ?? []
            ).includes('admin');
        });
    }

    ngOnInit(): void {
        this.getTags();
    }

    ngAfterViewInit(): void {
        // this.getTags();
    }

    addTag(tagName: string): void {
        this.dataService.tag.name = tagName;

        this.dataService.addTag().subscribe(
            (res) => {
                this.tags.push(...res.data);
                console.log(res);
            },
            (error) => {
                if (error.error.code !== 200) {
                    // console.log(this.router.url);
                    this.dataService.beforeSignInUrl = this.router.url;
                    this.router.navigate(['signIn']);
                }
            }
        );
        this.tagRef.nativeElement.value = '';
    }

    getTags(): void {
        this.dataService.getTags().subscribe((res) => {
            this.tags = res.data.tags;
            this.dataService.tags = this.tags;
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
                    this.dataService.beforeSignInUrl = this.router.url;
                    this.router.navigate(['signIn']);
                }
            }
        );
    }
}
