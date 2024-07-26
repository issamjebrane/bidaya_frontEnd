import {Component, OnInit} from '@angular/core';
import {User} from "../../../types/user.types";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.sass'
})
export class UserDashboardComponent implements OnInit{

  users:User[] = []  as User[];

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users
        console.log(users)
      },
      error: err => console.error(err)
    });
  }

}
