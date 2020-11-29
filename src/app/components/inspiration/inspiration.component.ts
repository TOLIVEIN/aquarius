import { Component, OnInit } from '@angular/core';
import Editor from 'wangeditor';

@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.less'],
})
export class InspirationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const editor = new Editor('#editorMenu', '#editor');
    // 或者 const editor = new E( document.getElementById('div1') )
    editor.create();
  }
}
