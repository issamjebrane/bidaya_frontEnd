import {
  AfterViewInit,
  Component,
  EventEmitter, Inject,
  Input, OnDestroy,
  Output, ViewChild,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import EditorJS from "@editorjs/editorjs";
import {BasicEditorComponent} from "../basic-editor/basic-editor.component";
import {Editor} from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import {TextStyle} from "@tiptap/extension-text-style";
import {Link} from "@tiptap/extension-link";
import {Underline} from "@tiptap/extension-underline";
import {Strike} from "@tiptap/extension-strike";
import {Placeholder} from "@tiptap/extension-placeholder";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.sass']
})
export class StoryComponent implements OnDestroy{
  @ViewChild(BasicEditorComponent)
  @Output() stepChange = new EventEmitter<number>();
  @Input() currentStep!: number;
  isLoading: boolean = false;
  isClicked: boolean = false;
  formGroup!: FormGroup;
  selectedFilePath: string = '';
  backgroundImage: string = '';
  videoUrlBackground: string = "https://www.youtube.com/embed/watch?v=KwnTCzLNdGI";
  isVideoLoading: boolean = false;
  value = "write your story here..."
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

  ngOnDestroy(): void {
    this.editor.destroy();

  }

  // todo add the form data to the local storage correctly
  handleSave() {

  }


  ngOnInit(): void {
    this.isLoading = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
      const formDataJsonString = localStorage.getItem('formData');
      let formData;
      if (formDataJsonString) {
        formData = JSON.parse(formDataJsonString);
      } else {
        formData = {};
      }
      this.formGroup = new FormGroup({
        videoUrl: new FormControl(formData.videoUrl || '', [Validators.required]),
        overlayImage: new FormControl('', [Validators.required]),
        story: new FormControl(formData.story || this.value, [Validators.required]),
      });

  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFilePath = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.backgroundImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFilePath = '';
    this.backgroundImage = '';
  }

  submitUrl() {
    if (this.formGroup.get('videoUrl')?.value) {
      const youtubeUrl = this.formGroup.get('videoUrl')?.value;
      let videoId = youtubeUrl.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      this.videoUrlBackground = 'https://www.youtube.com/embed/' + videoId;
    }
  }

  submit() {
    console.log(this.formGroup.value);

  }
}
