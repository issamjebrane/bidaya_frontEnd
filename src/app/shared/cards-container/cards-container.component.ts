import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Card} from '../../home/home.component';
import {Router} from "@angular/router";
import {ProjectService} from "../../services/project/project.service";

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class CardsContainerComponent implements OnInit {
  @Input() cards?: Card[]


  constructor(private route: Router,private projectService:ProjectService) {
  }



  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next:(campaigns  )=>{
        console.log(campaigns)
      }
    })
  }


  getDaysLeft(createdAt: Date, duration: number) {
    const today = new Date()
    const differenceInMilliseconds = today.getTime() - createdAt.getTime();
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
  }

  //the percentage of the days left for the project to finish for the progress bar
  //dont forget the date you passsing are outdated you need to change them
  getPercentage(createdAt: Date, duration: number) {
    const daysLeft = this.getDaysLeft(createdAt, duration);
    return daysLeft * (100 / duration)
  }

  goToCampaign(campaignTitle: string) {
    this.route.navigate(['/campaign', campaignTitle])
  }

}
