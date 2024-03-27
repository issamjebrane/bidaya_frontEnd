import { Injectable } from '@angular/core';
import { User } from '../../../types/user.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api:string = environment.API;

  constructor(private http: HttpClient) { }

  login(user:User):Observable<User>{
    return this.http.post<User>(`${environment.API}/users/login`,user);
  }

  register(user:User):Observable<User>{
    return this.http.post<User>(`${environment.API}/users/register`,user);
  }
}
