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

    isEditing = false;
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
        this.route.queryParams.subscribe((params) => {
            if (params.id) {
                this.initArticle(params.id);
            }
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
    editArticle(title: { value: string }): void {
        // const html = this.editor.txt.html() || '';
        // this.dataService.article.content = html;
        // this.clearTitle(title);
        // this.clearTags();
        // this.editor.txt.clear();
        // this.dataService.addArticle().subscribe((res) => {
        //     console.log(res.data);
        // });
        // this.dataService.editArticle()
        console.log('edit: ', title);
    }
    clearTitle(title: { value: string }): void {
        title.value = '';
    }
    clearTags(): void {
        this.utilService.clearInspirationTags();
    }

    initArticle(id: string): void {
        // console.log(id);
        // console.log(
        //     this.dataService.articles.filter(
        //         (article) => article.id?.toString() === id
        //     )[0]
        // );
        if (id) {
            this.isEditing = true;
        }
        const article = this.dataService.articles.filter(
            (article) => article.id?.toString() === id
        )[0];
        this.titleRef.nativeElement.value = article.title;

        this.dataService.article.title = article.title;

        this.editor.txt.html(article.content);
        this.dataService.article.content = article.content;

        const tags = article.tags?.map((tag) => tag.name) ?? [];
        this.utilService.inspirationTag$.next(tags);
        this.dataService.tags$.next(article.tags ?? []);
        this.cd.detectChanges();
        // console.log(this.titleRef);
    }
}
