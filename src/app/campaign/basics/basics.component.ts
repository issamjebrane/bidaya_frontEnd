import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import e from "express";
import {ProjectService} from "../../services/project/project.service";
import {categories, moroccanCities, subCategories} from "../../values";
import {map, Observable, startWith} from "rxjs";



@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrl: './basics.component.sass',

})
export class BasicsComponent implements OnInit{
  @Output() stepChange = new EventEmitter<number>();
  @Input () currentStep!: number;
  selectedFilePath: string = '';
  backgroundImage: string = '';
  formGroup!: FormGroup
  isClicked: boolean = false;
  cities = moroccanCities;
  searchTerm = '';
  filteredCities: string[] = [];
  categories = categories;
  subCategories = subCategories;
  constructor(private projectService:ProjectService) {}



  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
     setTimeout(() => {
      this.isLoading = false;
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }, 2000);
    if (typeof window !== 'undefined') {
         const formDataJsonString = localStorage.getItem('formData');
         let formData;
         if (formDataJsonString) {
           formData = JSON.parse(formDataJsonString);
         } else {
           formData = {};
         }
         this.formGroup = new FormGroup({
           title: new FormControl(formData.title || '', [Validators.required]),
           subtitle: new FormControl(formData.subtitle || '', [Validators.required]),
           category: new FormControl( formData.category || '', [Validators.required]),
           subCategory: new FormControl( formData.subCategory || '', [Validators.required]),
           location: new FormControl(''),
           goal: new FormControl(formData.goal || '', [Validators.required]),
           duration: new FormControl(formData.duration || '', [Validators.required]),
           cardImage: new FormControl('', [Validators.required]),
         });
       }
  }




  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFilePath = file.name;
      this.readFileAsDataURL(file).then(dataUrl => {
        this.backgroundImage = dataUrl;
      });
    }
  }
  readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }
  removeImage(): void {
    this.selectedFilePath = '';
    this.backgroundImage = '';
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
      cardImage: this.formGroup.get('cardImage')?.value
    }

    setTimeout(() => {
      this.isClicked = false;
      this.projectService.handleBasicFormSubmit(formData);
      this.stepChange.emit(this.currentStep + 1);
    }, 1000);
  }

  search() {
    const filterValue = this.formGroup.get('location')?.value.toLowerCase();
    this.filteredCities = this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }

  selectCity(city: string) {
    this.formGroup.get('location')?.setValue(city);
    this.filteredCities = [];
  }
}
