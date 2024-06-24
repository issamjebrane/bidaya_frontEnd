import { Component } from '@angular/core';
import {Step} from "../../../types/user.types";
import {Router} from "@angular/router";
import {isActive} from "@tiptap/core";


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
  protected currentStep:number = 1;


  constructor(private router: Router) {}

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.updateStepStatus(this.currentStep, false, true);
      this.currentStep++;
      this.updateStepStatus(this.currentStep, true, false);
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.updateStepStatus(this.currentStep, false, false);
      this.currentStep--;
      this.updateStepStatus(this.currentStep, true, this.isStepCompleted(this.currentStep));
    }
  }

  updateStepStatus(stepNumber: number, isActive: boolean, isCompleted: boolean) {
    const step = this.steps.find(step => step.stepNumber === stepNumber);
    if (step) {
      step.isStepActive = isActive;
      step.isStepCompleted = isCompleted;
    }
  }

  isStepCompleted(stepNumber: number): boolean {
    const step = this.steps.find(step => step.stepNumber === stepNumber);
    return step ? step.isStepCompleted : false;
  }

  onStepChange(stepNumber: number) {
    if(stepNumber === 4) {
      this.router.navigate(['/home']);
    }
    this.updateStepStatus(this.currentStep, true, true);

    this.currentStep = stepNumber;

    this.updateStepStatus(this.currentStep, true, false);  }

  protected readonly isActive = isActive;
}
