import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectService} from "../../services/project/project.service";



@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.sass'
})

//todo implement the rewards component with the html side.
export class RewardsComponent implements OnInit{
  @Input() currentStep!: number;
  @Output() stepChange = new EventEmitter<number>();
  formGroup!: FormGroup;
  isClicked: boolean = false;
  isLoading: boolean = false;

  constructor(protected projectService: ProjectService) {

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        overlayImage: new FormControl(''),
      }
    )
  }

  onFileSelected(event: Event): void {
    console.log('triggered')
    this.projectService.onFileSelected(event);
  }
  readFileAsDataURL(file: File): Promise<string> {
    return this.projectService.readFileAsDataURL(file);
  }
  removeImage(): void {
    this.projectService.removeImage();
    this.formGroup.get('overlayImage')?.reset();
  }

  uploadImage() {
    this.projectService.uploadImage();
  }
}
