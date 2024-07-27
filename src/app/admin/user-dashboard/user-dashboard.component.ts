import { Component, OnInit} from '@angular/core';
import {User} from "../../../types/user.types";
import {UsersService} from "../../services/users.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.sass',
  providers: [DatePipe]
})
export class UserDashboardComponent implements OnInit{

  users:User[] = []  as User[];
  date:Date = new Date();
  currentDate: string | null = '';
  isLoading: boolean = true;
  isDeleted: boolean = false;
  isDeleting: boolean = false;
  isNotFound: boolean = false;
  constructor(private userService: UsersService,private datePipe: DatePipe,private router:Router,private activatedRoute:ActivatedRoute) {
  }


  ngOnInit(): void {
    this.getUsers();
    //get the query params from the route
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        if(params['error']) {
          this.isNotFound = true;
          }
      }
    })
  }

  getUsers() {
      this.userService.getUserWithPage().subscribe({
        next: (data: User[]) => {
          this.users = data;
          this.isLoading = false;
        },
        error: (err: Error) => console.error(err)
      })
    }

  delete(id:number | undefined) {
    if(id !== undefined)
    this.userService.deleteUser(id).subscribe({
        next:() =>{
          this.isDeleted = true;
        },
        error: (err: Error) => console.error(err)
      },
      )
  }

  toggleDelete(){
    this.isDeleting = !this.isDeleting;
  }

  refresh() {
    this.isLoading = true;
    this.getUsers();
  }

  getUsersOnPage(page:number,limit:number) {
    this.isLoading = true;
    this.userService.getUserWithPage(page,limit).subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err: Error) => console.error
    })
  }

}
