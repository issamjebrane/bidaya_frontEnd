import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import EditorJS from "@editorjs/editorjs";

@Component({
  selector: 'app-basic-editor',
  templateUrl: './basic-editor.component.html',
  styleUrl: './basic-editor.component.sass'
})
export class BasicEditorComponent implements OnInit , AfterViewInit{

  @ViewChild('editor',{read:ElementRef,static:true}) editorElement!: ElementRef;
  // @ts-ignore
  private editor:EditorJS
  ngAfterViewInit(): void {
    this.initializeEditor();
  }
  ngOnInit() {
  }
  private  initializeEditor(): void {
    this.editor = new EditorJS({
      minHeight: 200,
      holder: this.editorElement.nativeElement,
    })
  }
}
