import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import * as hljs from 'highlight.js';
// import hljs from 'highlight.js';
import Editor from 'wangeditor';
import { DataService } from '../../services/data.service';
import { UtilService } from '../../services/util.service';
@Component({
    selector: 'app-inspiration',
    templateUrl: './inspiration.component.html',
    styleUrls: ['./inspiration.component.less'],
})
export class InspirationComponent implements OnInit, AfterViewInit {
    @ViewChild('title')
    titleRef!: ElementRef;

    private editor!: Editor;

    constructor(
        private dataService: DataService,
        private utilService: UtilService,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.editor = new Editor(
            '.inspiration-editor-menu',
            '.inspiration-editor-body'
        );
        // this.editor.highlight = hljs;
        this.editor.config.placeholder = '输入文章内容';
        this.editor.create();
    }

    ngAfterViewInit() {
        // this.titleRef.nativeElement;
        this.route.queryParams.subscribe((params) => {
            // this.id= params['id'];
            // console.log(params.id);
            this.editArticle(params.id);
        });
    }

    onKey(title: string) {
        this.dataService.article.title = title;
    }
    addArticle(title: { value: string }): void {
        const html = this.editor.txt.html() || '';
        this.dataService.article.content = html;
        this.clearTitle(title);
        this.clearTags();
        this.editor.txt.clear();
        this.dataService.addArticle().subscribe((res) => {
            console.log(res.data);
        });
    }
    clearTitle(title: { value: string }): void {
        title.value = '';
    }
    clearTags(): void {
        this.utilService.clearInspirationTags();
    }

    editArticle(id: string): void {
        // console.log(id);
        // console.log(
        //     this.dataService.articles.filter(
        //         (article) => article.id?.toString() === id
        //     )[0]
        // );
        this.titleRef.nativeElement.value = this.dataService.articles.filter(
            (article) => article.id?.toString() === id
        )[0].title;
        this.cd.detectChanges();
        // console.log(this.titleRef);
    }
}
