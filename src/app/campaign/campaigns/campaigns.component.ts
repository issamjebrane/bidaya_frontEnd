import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project/project.service";
import {debounceTime,  Subject, switchMap} from "rxjs";
import {filter} from "rxjs/operators";
import {Campaign} from "../../../types/campaign.types";
import {Router} from "@angular/router";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.sass'
})
export class CampaignsComponent  implements AfterViewInit ,OnInit{
  campaign :Campaign[] = []
  filtering: boolean = false;
  filterType: string = 'all';
  isLoadingProjects: boolean = false;
  searchTerm$ = new Subject<string>();
  matchingProjects: Campaign[] = [];
  showDropdown: boolean = false;
  searchTerm?: string ;
  noResults: boolean = false;
  loadSize: number = 8;

  ngAfterViewInit(): void {
  initFlowbite()
  }

  constructor(private route: Router,private projectService:ProjectService) {
    this.searchTerm$.pipe(
      debounceTime(300),
      filter(term => {return term.length > 2}),
      switchMap(term =>
        this.projectService.searchProjects(term)
      )
    ).subscribe({
      next: (projects: Campaign[]) => {
        this.showDropdown = true;
        this.matchingProjects = [];
        this.noResults = projects.length === 0;
        projects.forEach((project) => {
          this.matchingProjects.push(this.projectService.convertProjectImageUrl(project));
        })

      }
    });
  }


  ngOnInit(): void {
    this.isLoadingProjects = true;

    this.projectService.getProjects().subscribe({
      next:(projects  )=>{
        projects.forEach((project) => {
          this.campaign.push(this.projectService.convertProjectImageUrl(project));

        })
        this.isLoadingProjects = false
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


  filter(type:string ) {
    if(type === 'all'){
      this.filtering = false;
      this.filterType = 'all';
      this.campaign=[]
      this.projectService.getProjects().subscribe({
        next:(projects  )=>{
          projects.forEach((project) => {
            this.campaign.push(this.projectService.convertProjectImageUrl(project));
          })
          this.isLoadingProjects = false;
        }
      })
    }else{
    this.filterType = type;
    this.isLoadingProjects = true;
    this.campaign = []
    this.projectService.filterByCategory(type).subscribe({
      next:(projects  )=> {
        if (projects.length > 0) {
          projects.forEach((project) => {
            this.campaign.push(this.projectService.convertProjectImageUrl(project));
          })
          this.isLoadingProjects = false;
        }else if(projects.length === 0){
          this.isLoadingProjects = false
          alert('No projects found')
        }
      },
    error: () => {
      this.isLoadingProjects = false;
      this.filterType = 'all';
      alert('No projects found')
    }
    })
    }
  }

  sortingByCriteria(criteria:string) {
    this.isLoadingProjects = true;
    this.projectService.sortByCriteria(criteria).subscribe({
      next: (projects: Campaign[]) => {
        if(projects.length > 0){
          this.isLoadingProjects = false;
          this.campaign = []
        this.filtering = true;
          projects.forEach((project) => {
            this.campaign.push(this.projectService.convertProjectImageUrl(project));
          })
      }}
    })
  }

  onInputChange() {
    if (this.searchTerm && this.searchTerm.length > 2) {
      this.searchTerm = this.searchTerm.replace(/\s{2,}/g, ' ');
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
  goToProject(id: number) {
    this.route.navigate([`/campaign/${id.toString()}`]);
  }


}
