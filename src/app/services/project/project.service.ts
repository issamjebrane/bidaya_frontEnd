import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  handleBasicFormSubmit(formData:{}) {
    const formDataJsonString = JSON.stringify(formData);

    localStorage.setItem('formData', formDataJsonString);
  }
}
