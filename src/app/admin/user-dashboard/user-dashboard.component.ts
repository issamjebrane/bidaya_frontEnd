import {Component, OnInit} from '@angular/core';
import {User} from "../../../types/user.types";
import {UsersService} from "../../services/users.service";
import {DatePipe} from "@angular/common";

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
  constructor(private userService: UsersService,private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users
        this.isLoading = false;
      },
      error: err => console.error(err)
    });
    this.currentDate = this.datePipe.transform(this.date,'yyyy-MM-dd');
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
}
