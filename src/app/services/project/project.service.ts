import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment.development';
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Campaign} from "../../../types/campaign.types";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  file: any;
  private imageSrc!: SafeUrl;
  constructor(private http:HttpClient,private sanitizer: DomSanitizer) { }

  handleStepFormSubmit(formData:{},stepName:string) {
    const formDataJsonString = JSON.stringify(formData);
    localStorage.setItem(stepName, formDataJsonString);
    if(stepName === 'rewards'){
  // uploading all project data to the server
      this.uploadProjectData();
    }
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
        //get the file path from the server and add it to the file URL

        catchError(error => {
          // Handle the error here
          console.error('Error occurred:', error);
          return throwError(error);
        })
      )
  }

  private uploadProjectData() {
    const story = localStorage.getItem('story');
    const basicForm = localStorage.getItem('basicForm');
    const rewards = localStorage.getItem('rewards');

    const storyObject = story ? JSON.parse(story) : null;
    const basicFormObject = basicForm ? JSON.parse(basicForm) : null;
    const rewardsObject = rewards ? JSON.parse(rewards) : {rewards:[]};
    let formData = {
      basics: basicFormObject,
      story: storyObject,
      rewards: rewardsObject.rewards,
      userId: {
        email:'',

      }
    }
    // get the user id from the token then sending it to the server with the form data
    const token = localStorage.getItem('token');

    if (token) {
      const id =JSON.parse(atob(token.split('.')[1])).sub;
      formData = {...formData, "userId": {
        email: id
        }};
      this.http.post(`${environment.API}/projects/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('Error occurred:', error);
        }
      });
    }

  }


  private baseUrl = 'http://localhost:8080/api/v1/projects/images';


  getImage(filename: string |SafeUrl): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${filename}`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


  getProject(id: number) {
    return this.http.get<Campaign>(`${environment.API}/projects/project/${id}`);
  }

  removeLocalStorageDate() {
    localStorage.removeItem('basicForm');
    localStorage.removeItem('story');
    localStorage.removeItem('rewards');
  }

  getProjects():Observable<Campaign[]> {
   return this.http.get<Campaign[]>(`${environment.API}/projects`)
  }

  filterByCategory(type: string) {
   return  this.http.get<Campaign[]>(`${environment.API}/projects/category/${type}`)
  }

  sortByCriteria(criteria: string) {
   return  this.http.get<Campaign[]>(`${environment.API}/projects/sort/${criteria}`)
  }
}
