import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from "@angular/router";
import {ProjectService} from "../../services/project/project.service";
import {Campaign} from "../../../types/campaign.types";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {User} from "../../../types/user.types";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.sass',

})
export class CampaignComponent implements OnInit {
  isLoading: boolean = true;
  url:UrlSegment[] = [];
  fullPathUrl : string ='';
  project!: Campaign;
  user:User ={};
  selectedTab: string = 'story';
  isTabLoading: boolean = false;
  editorContent!:SafeHtml;


  constructor(private route:ActivatedRoute, private projectService: ProjectService, private sanitizer: DomSanitizer) {}



  ngOnInit(): void {
    this.route.url.subscribe((url) => {this.url = url
    })
    if(this.url[0].path) {
      this.projectService.getProject(Number(this.url[0].path))?.subscribe((project: Campaign) => {
        this.isLoading = false;
        this.project = this.projectService.convertProjectImageUrl(project);
        this.editorContent = this.sanitizer.bypassSecurityTrustHtml(project.story.editorContent);
    })
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1);
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

  percentage(creationDate: string,duration:number){
    const daysLeft = this.daysLeft(creationDate,duration);
    return Math.floor( (duration-daysLeft)*(100/duration))
  }
  copyLink() {
    this.fullPathUrl = window.location.href;
  }

  selectTab(tab: string) {
    this.isTabLoading = true;
    setTimeout(()=>{
      this.isTabLoading = false;
    },1000)
    this.selectedTab = tab;
  }

}
