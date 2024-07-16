import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from "@angular/router";
import {ProjectService} from "../../services/project/project.service";
import {Campaign} from "../../../types/campaign.types";
import {DomSanitizer, SafeHtml, SafeUrl} from "@angular/platform-browser";
import {forkJoin, map, Observable, of, timeout} from "rxjs";
import {catchError} from "rxjs/operators";
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
  errorMessage: string | null = null;
  project!: Campaign;
  user:User ={};
  selectedTab: string = 'story';
  isTabLoading: boolean = false;
  editorContent!:SafeHtml;


  constructor(private route:ActivatedRoute, private projectService: ProjectService, private sanitizer: DomSanitizer,private auth: AuthService) {}



  ngOnInit(): void {
    this.route.url.subscribe((url) => {this.url = url
    })
    if(this.url[0].path) {
      this.projectService.getProject(Number(this.url[0].path))?.subscribe((project: Campaign) => {
        this.convertProjectImageUrls(project).subscribe({
          next: (project) => {
            console.log(this.url)
            this.project = project;
            this.isLoading = false;
            this.user = this.project.userId
            this.editorContent = this.sanitizer.bypassSecurityTrustHtml(project.story.editorContent);
          },
          error: (error) => {
            console.error('Error occurred:', error);
            this.errorMessage = error;
          }
        }
        )
      });
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1);
  }


  generateImageUrl(fileUrl: string | SafeUrl): Observable<SafeUrl> {
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

  convertProjectImageUrls(project: Campaign): Observable<Campaign> {
    const imageObservables: { [key: string]: Observable<SafeUrl> } = {
      cardImage: this.generateImageUrl(project.basics.cardImage),
      storyFileUrl: this.generateImageUrl(project.story.fileUrl),
    };

    project.rewards.forEach((reward, index) => {
      imageObservables[`rewardFileUrl${index}`] = this.generateImageUrl(reward.fileUrl);
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
