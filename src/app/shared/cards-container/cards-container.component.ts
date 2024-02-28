import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Card } from '../../home/home.component';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class CardsContainerComponent {
  @Input() cards:Card[] =[]
}
