import {
  Component,
  EventEmitter,
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
import {ProjectService} from "../../services/project/project.service";

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
  videoUrlBackground: string = "";
  isVideoLoading: boolean = false;
  currentColor: string = '#000000'; // Default color
  isUploaded: boolean = false;
  fileUrl: string = '';
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
  constructor(private fb: FormBuilder,protected projectService:ProjectService) { }

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
      const formDataJsonString = localStorage.getItem('story');
      let formData;
      if (formDataJsonString) {
        formData = JSON.parse(formDataJsonString);
      } else {
        formData = {};
      }
    this.formGroup = new FormGroup({
      videoUrl: new FormControl(formData.videoUrl || '', [Validators.required]),
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
    this.projectService.onFileSelected(event);
  }

  removeImage(): void {
    this.projectService.removeImage();
    this.formGroup.get('cardImage')?.reset();
  }

  submitUrl(): void {
    const url = this.formGroup.get('videoUrl')?.value;
    let videoId: string | null = null;
    let iframeUrl: string = '';

    if (url.includes('youtube')) {
      videoId = this.getYoutubeId(url);
      if (videoId) {
        iframeUrl = `https://www.youtube.com/embed/${videoId}`;
        this.formGroup.get('videoUrl')?.setValue(iframeUrl);
        console.log(iframeUrl)
      }
    } else if (url.includes('vimeo')) {
      videoId = this.getVimeoId(url);
      if (videoId) {
        iframeUrl = `https://player.vimeo.com/video/${videoId}`;
        this.formGroup.get('videoUrl')?.setValue(iframeUrl);
        console.log(iframeUrl)
      }
    }

    if (iframeUrl) {
      this.videoUrlBackground = iframeUrl;
    } else {
      // Handle invalid URL
    }
  }

  getYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    console.log('match here')
    return (match && match[2]) ? match[2] : null;
  }

  getVimeoId(url: string): string | null {
    const regExp = /(http|https)?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
    const match = url.match(regExp);
    console.log(match)
    return (match && match[3]) ? match[3] : null;
  }
  uploadImage()
  {
    this.projectService.uploadImage()     .subscribe(
      {
        next: (data) => {
          // @ts-ignore
          this.fileUrl = data['filename'];
          console.log(this.fileUrl);
        },
        error: (error) => {
          console.error('Error occurred:', error);
        },
        complete: () => {
          this.isUploaded = true;
        }
      }
    );
  }
  submit() {
    this.isClicked = true;
    const formData = {
      videoUrl: this.formGroup.get('videoUrl')?.value,
      questions: this.formGroup.get('questions')?.value,
      fileUrl: this.fileUrl
    };
    this.projectService.handleStepFormSubmit(formData, 'story');
    setTimeout(() => {
      this.isClicked = false;
      this.stepChange.emit(this.currentStep + 1);
    }, 2000);
  }
}
