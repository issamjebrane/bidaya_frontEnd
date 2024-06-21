import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/project/project.service";

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.sass'
})

//todo implement the rewards component with the html side.
export class RewardsComponent implements OnInit {
  @Input() currentStep!: number;
  @Output() stepChange = new EventEmitter<number>();
  formGroup!: FormGroup;
  isClicked: boolean = false;
  isLoading: boolean = false;
  selectedFilePath: string = '';
  backgroundImage: string = '';
  isUploaded: boolean = false;
  fileUrl: string = '';
  isCongratulation: boolean = false;
  isLoadingCongratulation: boolean = false

  constructor(protected projectService: ProjectService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    window.scrollTo({top: 0, behavior: 'smooth'});
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    const formDataJsonString = localStorage.getItem('rewards');
    this.formGroup = new FormGroup(
      {
        rewards: this.formBuilder.array([this.createReward()])
      }
    )
    let formData;
    if (formDataJsonString) {
      formData = JSON.parse(formDataJsonString);
      this.isUploaded = !!formData;
      if (Array.isArray(formData.rewards)) {
        const rewardsFormArray = this.rewards;
        formData.rewards.forEach((reward: any, index: number) => {
          if (rewardsFormArray.at(index)) { // If the FormGroup at this index exists
            rewardsFormArray.at(index).setValue(reward); // Set its value to the corresponding object
          } else { // If the FormGroup at this index doesn't exist
            rewardsFormArray.push(this.formBuilder.group(reward)); // Create a new FormGroup with the object and push it to the FormArray
          }
        });
      }
    } else {
      formData = {};
    }
  }

  createReward() {
    // create a fom array of rewards using frombuilder
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      contributionLevel: ['', Validators.required],
      estimatedDeliveryDate: ['', Validators.required],
      fileUrl: ['', Validators.required]
    });
  }

  addReward() {
    (this.formGroup.get('rewards') as FormArray).push(this.createReward());
  }

  get rewards(): FormArray{
    return this.formGroup.get('rewards') as FormArray;
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

  readFileAsDataURL(file: File): Promise<string> {
    return this.projectService.readFileAsDataURL(file);
  }

  removeImage(): void {
    this.projectService.removeImage();
    this.selectedFilePath = '';
    this.backgroundImage = '';
  }

  uploadImage(i:number) {
    this.projectService.uploadImage().subscribe(
      {
        next: (data) => {
          // @ts-ignore
          this.fileUrl = data['filename'];
          const reward = this.rewards.at(i);
          reward?.get('fileUrl')?.setValue(this.fileUrl);
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
    // submit the form to projectService
    this.isLoadingCongratulation = true;
    setTimeout(() => {
      this.isLoadingCongratulation = false;
    }, 2000);
    const formData = this.formGroup.value;
    this.projectService.handleStepFormSubmit(formData, 'rewards');
    this.isCongratulation = true;
  }
}
