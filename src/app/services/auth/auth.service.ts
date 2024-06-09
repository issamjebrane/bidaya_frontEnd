import { Injectable } from '@angular/core';
import {AuthenticationResponse, User} from '../../../types/user.types';
import {Observable, tap,of} from 'rxjs';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {Router} from "@angular/router";
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.API;
  private tokenKey= "token";
  constructor(private http: HttpClient,private router:Router) {

  }

  login(user:User):Observable<AuthenticationResponse>{
    let returnedData =  this.http.post<AuthenticationResponse>(`${environment.API}/auth/authenticate`,user);
    returnedData.subscribe(next => {
      if(next.token != undefined){
        this.setToken(next.token);
        this.setUser({firstName:next.user.firstName,lastName:next.user.lastName});
      }
    })
    return returnedData;
  }

  register(user:User):Observable<AuthenticationResponse>{
    const lowercaseUser:User = {...user,email:user.email?.toLowerCase(),firstName:user.firstName?.toLowerCase(),lastName:user.lastName?.toLowerCase()}
    let returnedData =  this.http.post<AuthenticationResponse>(`${environment.API}/auth/register`,lowercaseUser);
    returnedData.subscribe(next => {
      if(next.token != undefined){
        this.setToken(next.token);
        this.setUser({firstName:next.user.firstName,lastName:next.user.lastName});
      }
    })
    return returnedData;
  }

  logout() {
    const token = this.getToken();
    return this.http.post(`${environment.API}/auth/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.removeToken();
          return of(null);
        }
        throw error;
      }),
      tap(() => this.removeToken())
    );
  }
  private setUser(user:User){
    localStorage?.setItem('user', JSON.stringify(user));
  }
  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  getUserFromLocalStorage(): any {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          return JSON.parse(user);
        } catch (e) {
          console.error('Error parsing user data from localStorage', e);
          return null;
        }
      }
    }
    return null;
  }
  private removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage?.getItem(this.tokenKey)
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}
