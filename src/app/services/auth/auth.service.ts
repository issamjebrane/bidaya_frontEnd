import { Injectable } from '@angular/core';
import {AuthenticationResponse, User} from '../../../types/user.types';
import {Observable, tap,of} from 'rxjs';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';
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
    console.log('i was called')
    return this.http.post<AuthenticationResponse>(`${environment.API}/auth/register`,lowercaseUser);

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
          return of(null);
        }
        const notification = document.createElement('div');
        notification.classList.add('fixed', 'bottom-0', 'right-0', 'm-6', 'p-4', 'bg-red-500', 'text-white', 'rounded-md', 'z-50');
        notification.textContent = 'something went wrong please try again later';
        throw error;
      }),
      tap(() => {
        this.removeToken();
      })
    );
  }
  setUser(user:User){
    localStorage?.setItem('user', JSON.stringify(user));
  }
  setToken(token: string) {
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
    localStorage.removeItem('user');
    localStorage.removeItem('basicForm');
    localStorage.removeItem('story');
    localStorage.removeItem('rewards');
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

  getUserInformation(email:string):Observable<User>{
    return this.http.get<User>(`${environment.API}/users/user/${email}`);
  }

}
