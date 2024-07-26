import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../../types/user.types";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.sass'
})
export class AdminLayoutComponent {

  constructor(private authService: AuthService) {
  }

  getUserFromLocalStorage(): User {
    return this.authService.getUserFromLocalStorage();
  }
}
