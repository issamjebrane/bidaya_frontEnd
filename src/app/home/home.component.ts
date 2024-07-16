import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {Campaign} from "../../types/campaign.types";
import {debounceTime, forkJoin, map, Observable, of, Subject, switchMap} from "rxjs";
import {catchError, filter} from "rxjs/operators";
import {Router} from "@angular/router";
import {ProjectService} from "../services/project/project.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

export interface Card {
  projectId?: number,
  image:string,
  title: string,
  description?: string,
  fundingGoal?: number,
  raisedFunds:number,
  durationDays: number,
  creatorId?: number,
  rewards?: string,
  type:string,
  careatedAt:Date
}
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

  cards:Card[] = [
    {
      image:'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'MSV Monitor : New Gaming Experience',
      raisedFunds:50240,
      durationDays:30,
      type:'MSV',
      careatedAt: new Date('2024-04-20')
    },
    {
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'Jakob & Rryan Movies pack',
      raisedFunds:10442,
      durationDays:30,
      type:'CINEMA',
      careatedAt: new Date('2024-04-19')

    }
    ,{
      image:'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'Green Fund : Sustain Earth Now',
      raisedFunds:50240,
      durationDays:60,
      type:'TECHNOLOGY',
      careatedAt: new Date('2024-04-15')
    } , {
      image:'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'MSV Monitor : New Gaming Experience',
      raisedFunds:50240,
      durationDays:60,
      type:'FOOD',
      careatedAt: new Date('2024-04-20')
    },
    {
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'Jakob & Rryan Movies pack',
      raisedFunds:10442,
      durationDays:30,
      type:'GAMING',
      careatedAt: new Date('2024-04-19')

    }
    ,{
      image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title:'Green Fund : Sustain Earth Now',
      raisedFunds:50240,
      durationDays:30,
      type:'ENTERTAINMENT',
      careatedAt: new Date('2024-04-15')
    }
  ]

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
  private errorMessage: any;

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
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
   stars(rating:number):number[] {
    return Array(Math.floor(rating)).fill(0);
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
