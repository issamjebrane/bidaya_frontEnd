import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrl: './story.component.sass'
})
export class StoryComponent {
  @Output() stepChange = new EventEmitter<number>();
  @Input () currentStep!: number;
  isLoading: boolean  = false;
  isClicked: boolean = false;
  formGroup!:FormGroup;
  selectedFilePath: string = '';
  backgroundImage: string = '';
  videoUrlBackground: string = "https://www.youtube.com/embed/watch?v=KwnTCzLNdGI";
  isVideoLoading: boolean = false;


  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    if (typeof window !== 'undefined') {
      const formDataJsonString = localStorage.getItem('formData');
      let formData;
      if (formDataJsonString) {
        formData = JSON.parse(formDataJsonString);
        this.formGroup = new FormGroup({
          story: new FormControl(formData.story || '', [Validators.required]),
          risks: new FormControl(formData.risks || '', [Validators.required]),
          videoUrl: new FormControl(formData.videoUrl || '', [Validators.required]),
          overlayImage: new FormControl( '', [Validators.required]),
        });
      }
    }
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
      console.log(this.videoUrlBackground)
    }
  }

  submit() {

  }
}
