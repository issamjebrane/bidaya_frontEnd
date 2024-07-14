import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {authGuard} from "../auth.guard";

const routes: Routes = [
  {
    path:'authentication',
    canActivate: [authGuard],
    children:[
      {
        path:'login',
        component:LoginComponent,
      },
      // {
      //   path:'register',
      //   component:RegisterComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
