import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  selectedFilePath: string = '';
  backgroundImage: string = '';
  file: any;
  constructor(private http:HttpClient) { }

  handleBasicFormSubmit(formData:{}) {
    const formDataJsonString = JSON.stringify(formData);
    localStorage.setItem('formData', formDataJsonString);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      if(this.file.size > 10485760 ){
        alert('File size is too big');
        return;
      }
      this.selectedFilePath = this.file.name;
      this.readFileAsDataURL(this.file).then(dataUrl => {
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
    this.file = null;
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.file);
    this.http.post('http://localhost:8080/api/v1/projects/upload', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .pipe(
        catchError(error => {
          // Handle the error here
          console.error('Error occurred:', error);
          return throwError(error);
        })
      )
      .subscribe(
         {
           next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => console.info('complete')
         }
      );
  }
}
