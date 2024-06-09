import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import {TextStyle} from "@tiptap/extension-text-style";
import {Link} from "@tiptap/extension-link";
import {Underline} from "@tiptap/extension-underline";
import {Strike} from "@tiptap/extension-strike";
import {Placeholder} from "@tiptap/extension-placeholder";

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.sass'
})

//todo implement the rewards component with the html side.
export class RewardsComponent implements OnDestroy {
  @Output() stepChange = new EventEmitter<number>();
  @Input () currentStep!: number;

  editor = new Editor({
    extensions: [
      StarterKit,
      TextStyle,
      Link,
      Underline,
      Strike,
      Placeholder.configure({
        placeholder: 'Enter text here...',
      }),
    ],
  });


  value = '<p>Hello, Tiptap!</p>'; // can be HTML or JSON, see https://www.tiptap.dev/api/editor#content

  ngOnDestroy(): void {
    this.editor.destroy();

  }


}
