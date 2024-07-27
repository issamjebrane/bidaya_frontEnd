import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../../types/user.types";
import {Router} from "@angular/router";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.sass'
})
export class AdminLayoutComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    initFlowbite();
  }



  getUserFromLocalStorage(): User {
    return this.authService.getUserFromLocalStorage();
  }
}
