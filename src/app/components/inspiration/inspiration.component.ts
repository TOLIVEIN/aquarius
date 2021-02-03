import { Component, OnInit } from '@angular/core';
// import * as hljs from 'highlight.js';
// import hljs from 'highlight.js';
import Editor from 'wangeditor';
import { DataService } from '../../services/data.service';
@Component({
    selector: 'app-inspiration',
    templateUrl: './inspiration.component.html',
    styleUrls: ['./inspiration.component.less'],
})
export class InspirationComponent implements OnInit {
    private editor!: Editor;
    constructor(private dataService: DataService) {}

    ngOnInit(): void {
        this.editor = new Editor('#editorMenu', '#editor');
        // this.editor.highlight = hljs;

        this.editor.config.placeholder = '输入文章内容';
        this.editor.create();
    }

    onKey(title: string) {
        this.dataService.article.title = title;
        console.log(title);
    }
    addArticle(): void {
        const html = this.editor.txt.html() || '';
        console.log(html);
        this.dataService.article.content = html;
        this.dataService.addArticle().subscribe((res) => {
            console.log(res.data);
        });
    }
}
