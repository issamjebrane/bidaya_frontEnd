import {Component, OnInit} from '@angular/core';
import {Campaign} from "../../types/campaign.types";
import {debounceTime ,Subject, switchMap} from "rxjs";
import { filter} from "rxjs/operators";
import {Router} from "@angular/router";
import {ProjectService} from "../services/project/project.service";

export interface UserComments {
  name:string,
  image:string,
  rating:number,
  duty:string,
  comment:string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})

export class HomeComponent implements OnInit{


  userComments:UserComments[] = [
    {
      name:'Ahmed Tahiri',
      duty:'School Teacher',
      image:'/assets/user1.svg',
      rating:5,
      comment:'Thanks to BIDAYA, keep up the good work! I would like to say thank you to all your staff and all the bakers behind it.'
    },
    {
      name:'Sami Fakroun',
      duty:'Music Composer',
      image:'/assets/user2.svg',
      rating:4.5,
      comment:'Thanks to BIDAYA, keep up the good work! I would like to say thank you to all your staff and all the bakers behind it.'
    },
    {
      name:'Basma Loukil',
      duty:'Community Manager',
      image:'/assets/user3.svg',
      rating:4,
      comment:'Thanks to BIDAYA, keep up the good work! I would like to say thank you to all your staff and all the bakers behind it.'
    },
    {
      name:'Sami Fakroun',
      duty:'Music Composer',
      image:'/assets/user2.svg',
      rating:4.5,
      comment:'Thanks to BIDAYA, keep up the good work! I would like to say thank you to all your staff and all the bakers behind it.'
    },
    {
      name:'Basma Loukil',
      duty:'Community Manager',
      image:'/assets/user3.svg',
      rating:4,
      comment:'Thanks to BIDAYA, keep up the good work! I would like to say thank you to all your staff and all the bakers behind it.'
    },
    {
      name:'Basma Loukil',
      duty:'Community Manager',
      image:'/assets/user3.svg',
      rating:4,
      comment:'Thanks to BIDAYA, keep up the good work! I would like to say thank you to all your staff and all the bakers behind it.'
    }
  ]
  searchTerm?: string ;
  noResults: boolean = false;
  showDropdown: boolean = false;
  matchingProjects: Campaign[] = [];
  searchTerm$ = new Subject<string>();

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
    // const token = localStorage.getItem('token');
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  onBlur() {
    setTimeout(() => {
      this.showDropdown = false;
      this.matchingProjects = [];
    }, 200); // Delay to allow click event on dropdown items
  }
  onInputChange() {
    if (this.searchTerm && this.searchTerm.length >= 3) {
      //check if searchTerm contains more than one space and delete it
      this.searchTerm = this.searchTerm.replace(/\s{2,}/g, ' ');
      this.searchTerm$.next(this.searchTerm);
    }
  }

  goToProject(id: number) {
    this.route.navigate([`/campaign/${id.toString()}`]);
  }
}
