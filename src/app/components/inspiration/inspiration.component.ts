import { Component, OnInit } from '@angular/core';
import Editor from 'wangeditor';
import * as hljs from 'highlight.js';
import { ConfigService } from '../../services/config.service';
@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.less'],
})
export class InspirationComponent implements OnInit {

  private editor!: Editor;
  constructor(private config: ConfigService) {}

  ngOnInit(): void {
    this.editor = new Editor('#editorMenu', '#editor');
    // const editor = new Eeditor(
    //   document.getElementById('editorMenu'),
    //   document.getElementById('editor')
    // );

    // editor.config.height = 1000;
    this.editor.highlight = hljs;

    this.editor.config.placeholder = '输入文章内容';
    this.editor.create();

    this.config.getConfig().subscribe(data => {
      console.log(data);
    });

  }
  public getHtml(): void {
    const html = this.editor.txt.html();
    console.log(html);

    // console.log(e);
  }
}
