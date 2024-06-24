import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Step} from "../../../types/user.types";



@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.sass'
})
export class StepsComponent {
  @Input() step?:Step
  @Output() stepChange = new EventEmitter<Step>()
  //
  // onStepClick() {
  //   // @ts-ignore
  //   this.stepChange.emit(this.step.stepNumber);
  // }
}
