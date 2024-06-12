import {
  AfterViewInit,
  Component,
  EventEmitter, Inject,
  Input, OnDestroy,
  Output
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Editor} from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import {TextStyle} from "@tiptap/extension-text-style";
import {Link} from "@tiptap/extension-link";
import {Underline} from "@tiptap/extension-underline";
import {Color} from "@tiptap/extension-color";
import Blockquote from '@tiptap/extension-blockquote';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.sass']
})

export class StoryComponent implements OnDestroy{
  @Output() stepChange = new EventEmitter<number>();
  @Input() currentStep!: number;
  isLoading: boolean = false;
  isClicked: boolean = false;
  formGroup!: FormGroup;
  selectedFilePath: string = '';
  backgroundImage: string = '';
  videoUrlBackground: string = "https://www.youtube.com/embed/watch?v=KwnTCzLNdGI";
  isVideoLoading: boolean = false;
  currentColor: string = '#000000'; // Default color
  // todo implement the editor
  editor = new Editor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      Link,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content: `
        <h3>
          write your Storyyyyyyyyyy here
        </h3>
      `,
  });
  constructor(private fb: FormBuilder) { }

  setColor(event: Event): void {
    const input = event.target as HTMLInputElement; // Typecast to HTMLInputElement
    const color = input.value;
    this.currentColor = color;
    if (this.editor) {
      this.editor.chain().focus().setColor(color).run();
    }
  }
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
      questions: this.fb.array([this.createQuestion()])
    });
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    }, {validator: this.questionAnswerValidator});
  }
  questionAnswerValidator(formGroup: FormGroup) {
    const question = formGroup.get('question');
    const answer = formGroup.get('answer');

    if (question?.value.trim() && answer?.value.trim()) {
      return null;  // return null if both fields are filled
    } else {
      return {questionAnswer: true};  // return validation error if one of them is not filled
    }
  }
  addQuestion(): void {
    (this.formGroup.get('questions') as FormArray).push(this.createQuestion());
  }

  get questionForms() {
    return this.formGroup.get('questions') as FormArray;
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

  }
}
