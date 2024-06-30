import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Card} from '../../home/home.component';
import {Router} from "@angular/router";
import {ProjectService} from "../../services/project/project.service";
import {Campaign} from "../../../types/campaign.types";
import {forkJoin, map, Observable, of} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class CardsContainerComponent implements OnInit {
  @Input() cards?: Card[]
  campaign :Campaign[] = []
  private errorMessage: any;

  constructor(private route: Router,private projectService:ProjectService,private sanitizer: DomSanitizer) {
  }

  toDate(creationDate : string){
    return new Date(creationDate);
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next:(campaigns  )=>{
        campaigns.forEach((project) => {
          this.convertProjectImageUrl(
            project
          ).subscribe((project) => {
              this.campaign.push(project)
            }
          )
        })

      }
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
  //dont forget the date you passsing are outdated you need to change them
  percentage(creationDate: string,duration:number){
    const daysLeft = this.daysLeft(creationDate,duration);
    return Math.floor( (duration-daysLeft)*(100/duration))
  }

  goToCampaign(campaignTitle: string) {
    this.route.navigate(['/campaign', campaignTitle])
  }


  generateImageUrs(fileUrl: string | SafeUrl): Observable<SafeUrl> {
    return this.projectService.getImage(fileUrl).pipe(
      map(data => {
        const objectURL = URL.createObjectURL(data);
        return this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        this.errorMessage = error;
        return of(null as any);  // Return a null SafeUrl on error
      })
    );
  }

  convertProjectImageUrl(project: Campaign): Observable<Campaign> {
    const imageObservables: { [key: string]: Observable<SafeUrl> } = {
      cardImage: this.generateImageUrs(project.basics.cardImage),
      storyFileUrl: this.generateImageUrs(project.story.fileUrl),
    };

    project.rewards.forEach((reward, index) => {
      imageObservables[`rewardFileUrl${index}`] = this.generateImageUrs(reward.fileUrl);
    });

    return forkJoin(imageObservables).pipe(
      map(results => {
        // @ts-ignore
        project.basics.cardImage = results.cardImage;
        // @ts-ignore
        project.story.fileUrl = results.storyFileUrl;
        project.rewards.forEach((reward, index) => {
          // @ts-ignore
          reward.fileUrl = results[`rewardFileUrl${index}`];

        });
        return project;
      })
    );
  }
}
