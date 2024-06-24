import {
  Component,
  EventEmitter,
  Input, OnDestroy, OnInit,
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

export class StoryComponent implements OnDestroy,OnInit{
  @Output() stepChange = new EventEmitter<number>();
  @Input() currentStep!: number;
  isLoading: boolean = false;
  isClicked: boolean = false;
  formGroup!: FormGroup;
  videoUrlBackground: string = "";
  currentColor: string = '#000000'; // Default color
  isUploaded: boolean = false;
  fileUrl: string = '';
  isVideoUrlValid: boolean = true;
  selectedFilePath: string = '';
  backgroundImage: string = '';
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
    const input = event.target as HTMLInputElement;
    const color = input.value;
    this.currentColor = color;
    if (this.editor) {
      this.editor.chain().focus().setColor(color).run();
    }
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }


  ngOnInit(): void {
    this.isLoading = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    const formDataJsonString = localStorage.getItem('story');
    this.formGroup = new FormGroup({
      videoUrl: new FormControl( '', [Validators.required]),
      questions: this.fb.array([this.createQuestion()])
    });
    // add the form data edtiorcontent from local storage to the editor

    let formData;
    if (formDataJsonString) {
      formData = JSON.parse(formDataJsonString);
      this.formGroup.get('videoUrl')?.setValue(formData.videoUrl);
      this.fileUrl = formData.fileUrl;
      this.isUploaded = !!formData;
      if (formData.editorContent) {
        this.editor.commands.setContent(formData.editorContent);
      }
      if (Array.isArray(formData.questions)) {
        const questionsFormArray = (this.formGroup.get('questions') as FormArray);
        formData.questions.forEach((question:any, index:number) => {
          if (questionsFormArray.at(index)) {
            questionsFormArray.at(index).setValue(question);
          } else {
            questionsFormArray.push(this.fb.group(question));
          }
        });
      }
    } else {
      formData = {};
    }

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
      return null;
    } else {
      return {questionAnswer: true};
    }
  }
  addQuestion(): void {
    (this.formGroup.get('questions') as FormArray).push(this.createQuestion());
  }

  get questionForms() {
    return this.formGroup.get('questions') as FormArray;
  }


  onFileSelected(event: Event): void {
    const {
      selectedFilePath,
      readFile$
    } = this.projectService.onFileSelected(event);

    this.selectedFilePath = selectedFilePath;
    readFile$.then((result) => {
      this.backgroundImage = result;
    });
    (event.target as HTMLInputElement).value = '';
  }

  removeImage(): void {
    this.projectService.removeImage();
    this.selectedFilePath = '';
    this.backgroundImage = '';
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
      }
    } else if (url.includes('vimeo')) {
      videoId = this.getVimeoId(url);
      if (videoId) {
        iframeUrl = `https://player.vimeo.com/video/${videoId}`;
        this.formGroup.get('videoUrl')?.setValue(iframeUrl);
      }
    }

    if (iframeUrl) {
      this.videoUrlBackground = iframeUrl;
      this.isVideoUrlValid = true;
    } else {
      this.isVideoUrlValid = false;
    }
  }

  getYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2]) ? match[2] : null;
  }

  getVimeoId(url: string): string | null {
    const regExp = /(http|https)?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
    const match = url.match(regExp);
    return (match && match[3]) ? match[3] : null;
  }

  uploadImage() {
    this.projectService.uploadImage()     .subscribe(
      {
        next: (data) => {
          // @ts-ignore
          this.fileUrl = data['filename'];
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
      editorContent: this.editor.getHTML(),
      fileUrl: this.fileUrl
    };
    this.projectService.handleStepFormSubmit(formData, 'story');
    setTimeout(() => {
      this.isClicked = false;
      this.stepChange.emit(this.currentStep + 1);
    }, 2000);
  }
}
