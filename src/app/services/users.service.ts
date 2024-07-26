import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../types/user.types";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${environment.API}/users/all-users`);
  }
}
