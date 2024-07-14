import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {authGuard} from "../auth.guard";
import {RegistrationComponent} from "./registration/registration.component";

const routes: Routes = [
  {
    path:'authentication',
    canActivate: [authGuard],
    children:[
      {
        path:'login',
        component:LoginComponent,
      },
      {
        path:'register',
        component:RegistrationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
