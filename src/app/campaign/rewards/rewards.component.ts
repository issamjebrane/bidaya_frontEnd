import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.sass'
})
export class RewardsComponent {
  @Output() stepChange = new EventEmitter<number>();
  @Input () currentStep!: number;
}
