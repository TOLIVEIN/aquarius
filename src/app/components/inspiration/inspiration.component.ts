import { Component, OnInit } from '@angular/core';
import * as hljs from 'highlight.js';
import Editor from 'wangeditor';
import { ConfigService } from '../../services/config.service';
import { DataService } from '../../services/data.service';
@Component({
    selector: 'app-inspiration',
    templateUrl: './inspiration.component.html',
    styleUrls: ['./inspiration.component.less'],
})
export class InspirationComponent implements OnInit {
    private editor!: Editor;
    constructor(
        private config: ConfigService,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.editor = new Editor('#editorMenu', '#editor');
        // const editor = new Eeditor(
        //   document.getElementById('editorMenu'),
        //   document.getElementById('editor')
        // );

        // editor.config.height = 1000;
        this.editor.highlight = hljs;

        this.editor.config.placeholder = '输入文章内容';
        // this.editor.fullScreen()
        this.editor.create();

        this.config.getConfig().subscribe((data) => {
            // console.log(data);
        });
    }

    onKey(title: string) {
        this.dataService.article.title = title;
        console.log(title);
    }
    addArticle(): void {
        const html = this.editor.txt.html() || '';
        console.log(html);
        // this.dataService
        //     .getTagsByName(this.dataService.selectedTags)
        //     .subscribe((res) => {
        //         console.log(res);
        //     });
        this.dataService.article.content = html;
        this.dataService.addArticle().subscribe((res) => {
            console.log(res.data);
        });

        // console.log(e);
    }
}
