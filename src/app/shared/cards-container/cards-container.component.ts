import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../services/project/project.service";
import {Campaign} from "../../../types/campaign.types";

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class CardsContainerComponent implements OnInit {
  campaign :Campaign[] = []
  filtering: boolean = false;
  filterType: string = 'all';
  constructor(private route: Router,private projectService:ProjectService) {}
  loadingCards: boolean = false;


  ngOnInit(): void {
    this.loadingCards = true;
    this.projectService.getProjects().subscribe({
      next:(projects  )=>{
        if(projects.length > 0){
          projects.forEach((project) => {
            this.campaign.push(this.projectService.convertProjectImageUrl(project));
          })
          this.loadingCards = false;
      }}
    })
  }


  daysLeft(creationDate: string,duration:number) {
    const dateOfCreation = new Date(creationDate);
    const currentDate = new Date();

    //calculates the number of days between the creation date and the current date
    const daysLeftMs = currentDate.getTime() - dateOfCreation.getTime();

    //returns the remaining days
    return  duration - Math.floor(daysLeftMs / (1000 * 60 * 60 * 24));

  }

  //the percentage of the days left for the project to finish for the progress bar
  //don't forget the date you are passing are outdated you need to change them
  percentage(creationDate: string,duration:number){
    const daysLeft = this.daysLeft(creationDate,duration);
    return Math.floor( (duration-daysLeft)*(100/duration))
  }

  goToCampaign(id:number) {
    this.route.navigate(['/campaign', id.toString()])
  }


  filter(type:string ) {
    if(type === 'all'){
      this.filtering = false;
      this.campaign=[]
      this.filterType = 'all';
      this.projectService.getProjects().subscribe({
        next:(projects  )=>{
          projects.forEach((project) => {
            this.campaign.push(this.projectService.convertProjectImageUrl(project));
          })
          this.loadingCards = false;
        }
      })
    }else{
      this.filterType = type;
      this.loadingCards = true;
      this.projectService.filterByCategory(type).subscribe({
        next:(projects  )=>{
          if(projects.length > 0){
            this.loadingCards = false;
            this.campaign = []
            projects.forEach((project) => {
              this.campaign.push(this.projectService.convertProjectImageUrl(project));
            })
          }},
          error: () => {
            this.loadingCards = false;
            this.filterType = 'all';
            alert('No projects found')
          }
      }
        )
    }
  }
}
