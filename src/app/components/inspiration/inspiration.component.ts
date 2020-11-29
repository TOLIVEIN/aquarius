import { Component, OnInit } from '@angular/core';
import Editor from 'wangeditor';
import * as hljs from 'highlight.js';
@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.less'],
})
export class InspirationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const editor = new Editor('#editorMenu', '#editor');
    // const editor = new Eeditor(
    //   document.getElementById('editorMenu'),
    //   document.getElementById('editor')
    // );

    // editor.config.height = 1000;
    editor.highlight = hljs;

    editor.config.placeholder = '输入文章内容';
    editor.create();
  }
}
