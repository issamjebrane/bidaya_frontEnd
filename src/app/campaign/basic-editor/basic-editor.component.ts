import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import EditorJS from "@editorjs/editorjs";
//@ts-ignore
import Header from '@editorjs/header';
//@ts-ignore
import List from '@editorjs/list';
//@ts-ignore
import SimpleImage from '@editorjs/simple-image';
//@ts-ignore
import Quote from '@editorjs/quote';
//@ts-ignore
import Paragraph from '@editorjs/paragraph';
//@ts-ignore
import Embed from '@editorjs/embed';
let input = Input;

@Component({
  selector: 'app-basic-editor',
  templateUrl: './basic-editor.component.html',
  styleUrls: ['./basic-editor.component.sass']
})

export class BasicEditorComponent implements  AfterViewInit {
  @ViewChild('editor', { read: ElementRef, static: true }) editorElement!: ElementRef;
  editor!: EditorJS;
  ngAfterViewInit(): void {
    this.initialize();
  }


  private initialize(): void {
    this.editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Let`s write an awesome story!',
      autofocus: true,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [2, 3, 4],
            defaultLevel: 3
          },
          inlineToolbar: ['link','bold','italic']
        },
          list: {
            class: List,
            inlineToolbar: ['link','bold']
          },
          embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
              services: {
                youtube: true,
                coub: true
              }
            },
          },
          image: SimpleImage,

      }
    }
    );
  }

  save() {
    return this.editor.save();
  }

}
