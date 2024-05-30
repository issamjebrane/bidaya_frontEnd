import { Component } from '@angular/core';
import {Step} from "../../../types/user.types";



@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrl: './project-creation.component.sass'
})
export class ProjectCreationComponent {
  protected steps: Step[] = [
    {
      stepTitle: 'Basics',
      stepDescription: 'Fill basic information',
      stepNumber: 1,
      isStepActive:true,
      isStepCompleted:false
    },
    {
      stepTitle: 'Story',
      stepDescription: 'Fill story details',
      stepNumber: 2,
      isStepActive:false,
      isStepCompleted:false
    },
    {
      stepTitle: 'Rewards',
      stepDescription: 'Add Rewards',
      stepNumber: 3,
      isStepActive:false,
      isStepCompleted:false
    }
  ]
}
