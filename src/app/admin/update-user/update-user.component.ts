import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/user/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";
import {User} from "../../../types/user.types";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.sass'
})
export class UpdateUserComponent implements OnInit{
  user: User = {} as User;

  constructor(private userService: UsersService,private router:Router,private activatedRoute:ActivatedRoute) {

  }

  ngOnInit(): void {
    //get user id from route params and then get user from server
    this.activatedRoute.params.pipe(
      map(params => params['id'])
    ).subscribe({
      next: (id: number) => {
        this.userService.getUser(id).subscribe(
          {
            next: (data: User) => this.user = data,
            //check http error status if 404 indicate that user does not exist
            error: (err: Error) => {
              if(err.message.includes('404')) {
                this.router.navigate(['/admin/users'],{queryParams:{error:'User not found'}});
              }
            }
          }
        )
      },
      error: (err: Error) => console.log(err.message)
    })
  }
}
