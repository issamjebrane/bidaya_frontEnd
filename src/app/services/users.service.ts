import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../types/user.types";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${environment.API}/users/all-users`);
  }

  deleteUser(id:number):Observable<any> {
    //send user id to be deleted as a query parameter
    return this.http.delete(`${environment.API}/users/delete-user`,{params:{id:id}});
  }
}
