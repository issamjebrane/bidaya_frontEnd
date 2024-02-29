import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Card } from '../../home/home.component';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class CardsContainerComponent {
  @Input() cards?:Card[]


  getDaysLeft(createdAt:Date,duration:number){
    const today = new Date()
    const differenceInMilliseconds = today.getTime() - createdAt.getTime();
    const difference =  Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return difference
  }

  //the percentage of the days left for the project to finish for the progress bar
  getPercentage(createdAt:Date,duration:number){

    const daysLeft = this.getDaysLeft(createdAt,duration);
    return daysLeft*(100/duration) 
  }
}
