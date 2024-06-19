import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  file: any;
  constructor(private http:HttpClient) { }

  handleStepFormSubmit(formData:{},stepName:string) {
    const formDataJsonString = JSON.stringify(formData);
    localStorage.setItem(stepName, formDataJsonString);
  }

  onFileSelected(event: Event): {readFile$:Promise<string>,selectedFilePath:string} {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      if(this.file.size > 50485760 ){
        alert('File size is too big');
        return{
          readFile$:new Promise((resolve,reject)=>{}),
          selectedFilePath:''
        };
      }
      const selectedFilePath = this.file.name;
      let backgroundImage = '';
      return {
        readFile$:this.readFileAsDataURL(this.file),
        selectedFilePath:selectedFilePath,
      }
    }
  return {
    readFile$:new Promise((resolve,reject)=>{}),
    selectedFilePath:''
  } ;
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
    this.file = null;
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.file);
    return this.http.post('http://localhost:8080/api/v1/projects/upload', formData, {
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
  }

}
