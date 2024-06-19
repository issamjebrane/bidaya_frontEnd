import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/project/project.service";
import {categories, moroccanCities, subCategories} from "../../values";



@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrl: './basics.component.sass',

})
export class BasicsComponent implements OnInit{
  @Output() stepChange = new EventEmitter<number>();
  @Input () currentStep!: number;
  formGroup!: FormGroup
  isClicked: boolean = false;
  cities = moroccanCities;
  filteredCities: string[] = [];
  categories = categories;
  subCategories = subCategories;
  fileUrl: string = '';
  isUploaded: boolean = false;
  selectedFilePath: string = '';
  backgroundImage: string = '';
  constructor(protected projectService:ProjectService) {
  }

  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
     setTimeout(() => {
      this.isLoading = false;
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }, 2000);
    if (typeof window !== 'undefined') {
         const formDataJsonString = localStorage.getItem('basicForm');
         let formData;
         if (formDataJsonString) {
           formData = JSON.parse(formDataJsonString);
           this.isUploaded = !!formData;
           this.fileUrl = formData.cardImage;
         } else {
           formData = {};
         }
         this.formGroup = new FormGroup({
           title: new FormControl(formData.title || '', [Validators.required]),
           subtitle: new FormControl(formData.subtitle || '', [Validators.required]),
           category: new FormControl( formData.category || '', [Validators.required]),
           subCategory: new FormControl( formData.subCategory || '', [Validators.required]),
           location: new FormControl(formData.location || '', [Validators.required]),
           goal: new FormControl(formData.goal || '', [Validators.required]),
           duration: new FormControl(formData.duration || '', [Validators.required]),
         });
       }
  }



  onFileSelected(event: Event): void {
    const {
      selectedFilePath,
      readFile$
    } = this.projectService.onFileSelected(event);

    this.selectedFilePath = selectedFilePath;
    readFile$.then((result) => {
      this.backgroundImage = result;
      this.formGroup.controls['cardImage'].setValue(this.selectedFilePath);
    });
    (event.target as HTMLInputElement).value = '';
  }

  removeImage(): void {
    this.projectService.removeImage();
    this.selectedFilePath = '';
    this.backgroundImage = '';
  }


  onInputChange(event: Event,controlName :string): void {
    let value = (event.target as HTMLInputElement).valueAsNumber;
    if (value < 0) {
      value = 0;
    } else if (!Number.isInteger(value)) {
      value = Math.ceil(value);
    }
    this.formGroup.controls[controlName].setValue(value);
  }

  search() {
    const filterValue = this.formGroup.get('location')?.value.toLowerCase();
    this.filteredCities = this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }

  selectCity(city: string) {
    this.formGroup.get('location')?.setValue(city);
    this.filteredCities = [];
  }

  uploadImage() {
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

  submit(): void {
    this.isClicked = true;
    const formData = {
      title: this.formGroup.get('title')?.value,
      subtitle: this.formGroup.get('subtitle')?.value,
      category: this.formGroup.get('category')?.value,
      subCategory: this.formGroup.get('subCategory')?.value,
      location: this.formGroup.get('location')?.value,
      goal: this.formGroup.get('goal')?.value,
      duration: this.formGroup.get('duration')?.value,
      cardImage: this.fileUrl
    }
      setTimeout(() => {
      this.isClicked = false;
      this.projectService.handleStepFormSubmit(formData,'basicForm');
      this.stepChange.emit(this.currentStep + 1);
    }, 1000);
  }

}
