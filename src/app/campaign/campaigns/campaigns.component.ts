import {AfterViewInit, Component} from '@angular/core';
import {ProjectService} from "../../services/project/project.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {debounceTime, distinctUntilChanged, forkJoin, map, Observable, of, Subject, switchMap} from "rxjs";
import {catchError, filter} from "rxjs/operators";
import {Campaign} from "../../../types/campaign.types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.sass'
})
export class CampaignsComponent  {
  campaign :Campaign[] = []
  private errorMessage: any;
  filtering: boolean = false;
  filterType: string = 'all';
  isLoadingProjects: boolean = false;
  searchTerm$ = new Subject<string>();
  matchingProjects: Campaign[] = [];
  showDropdown: boolean = false;
  searchTerm?: string ;
  noResults: boolean = false;
  loadSize: number = 8;
  constructor(private route: Router,private projectService:ProjectService,private sanitizer: DomSanitizer,) {
    this.searchTerm$.pipe(
      debounceTime(300), // Wait 300ms after the last keystroke before triggering the search
      filter(term => {return term.length >= 3}), // Only trigger if the search term is longer than 3 characters
      switchMap(term =>
        this.projectService.searchProjects(term)
      )
    ).subscribe({
      next: (projects: Campaign[]) => {
        this.showDropdown = true;
        this.matchingProjects = [];
        this.noResults = projects.length === 0;
        projects.forEach((project) => {
          this.convertProjectImageUrl(
            project
          ).subscribe((project) => {
              this.matchingProjects.push(project)
            }
          )
        })
      }
    });
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


    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
  filter(type:string ) {
    this.filterType = type;
    this.isLoadingProjects = true;
    setTimeout(() => {
      this.isLoadingProjects = false;
    },500)
    this.projectService.filterByCategory(type).subscribe({
      next:(campaigns  )=>{
        campaigns.forEach((project) => {
          this.campaign = []
          this.convertProjectImageUrl(
            project
          ).subscribe((project) => {
              this.filtering = true;
              this.campaign.push(project)
            }
          )
        })
      }
    })
    if(type === 'all'){
      this.filtering = false;
      this.campaign=[]
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
  }
  sortingByCriteria(criteria:string) {
    this.isLoadingProjects = true;
    setTimeout(() => {
      this.isLoadingProjects = false;
    }, 500)
    this.projectService.sortByCriteria(criteria).subscribe({
      next: (campaigns: Campaign[]) => {
        this.campaign = []
        this.filtering = true;
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

  onInputChange() {
    if (this.searchTerm && this.searchTerm.length > 3) {
      this.searchTerm$.next(this.searchTerm);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.showDropdown = false;
      this.matchingProjects = [];
    }, 200); // Delay to allow click event on dropdown items
  }

  LoadMore() {
    this.loadSize += 8;
  }

}
