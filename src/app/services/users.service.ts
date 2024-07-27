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

  getUserWithPage(page:number = 0 ,limit:number = 10):Observable<User[]> {
    return this.http.get<User[]>(`${environment.API}/admin/users`,{params:{page:page,limit:limit}});
  }

  deleteUser(id:number):Observable<any> {
    //send user id to be deleted as a query parameter
    return this.http.delete(`${environment.API}/users/delete-user`,{params:{id:id}});
  }

  getUser(id: number) {
    return this.http.get<User>(`${environment.API}/admin/user/${id}`);
  }
}
