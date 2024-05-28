import { Injectable } from '@angular/core';
import {Token, User} from '../../../types/user.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.API;
  private tokenKey= "token";

  constructor(private http: HttpClient,private router:Router) { }

  login(user:User):Observable<Token>{
    let returnedData =  this.http.post<Token>(`${environment.API}/auth/authenticate`,user);
    returnedData.subscribe(next => {
      if(next.token != undefined){
        this.setToken(next.token);
      }
    })
    return returnedData;
  }

  register(user:User):Observable<User>{
    const lowercaseUser:User = {...user,email:user.email.toLowerCase(),firstName:user.firstName?.toLowerCase(),lastName:user.lastName?.toLowerCase()}
    return this.http.post<User>(`${environment.API}/auth/register`,lowercaseUser);
  }


  logout() {
    this.removeToken();
    this.router.navigate(['authenticate/login']);
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
