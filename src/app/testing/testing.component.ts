import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjectService} from "../services/project/project.service";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.sass'
})
export class TestingComponent {
  imageUrl: any;
  imagePath: any;
  constructor(private http : HttpClient,private projectService:ProjectService) {}

  uploadImage(event:Event) {
    // @ts-ignore
    console.log(event.target.files[0])
    const formData = new FormData();
    // @ts-ignore
    formData.append('file',event.target.files[0])
    // @ts-ignore
    this.http.post('http://localhost:8080/api/v1/projects/upload',formData).subscribe({
        next : (response: any) => {
          this.imagePath = response;
          console.log(this.imagePath)
        }
      }
    )
  }
  upload() {
    const formatData = new FormData();
    console.log(this.imagePath.filename)
    formatData.append('file',this.imagePath.filename);
    this.http.post('http://localhost:8080/api/v1/projects/uploadImage',formatData).subscribe({
      next: (response: any) => {
        console.log(response)
      }
    })
  }
  getImage(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/projects/getImage/${id}`);
  }

  loadImage() {
    this.getImage(1).subscribe((response:any) => {

        const blob = this.projectService.convertToByte(response.imageData);
        this.imageUrl = URL.createObjectURL(blob);
        console.log(this.imageUrl)

    });
  }

}
