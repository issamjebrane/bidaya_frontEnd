import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {UserDashboardComponent} from "./user-dashboard/user-dashboard.component";
import {ProjectDashboardComponent} from "./project-dashboard/project-dashboard.component";
import {adminGuard} from "../auth.guard";

const routes: Routes = [
  {
    path: 'admin',
    component:AdminLayoutComponent,
    canActivate: [adminGuard],
    children:[
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        component:UserDashboardComponent
      },
      {
        path:'projects',
        component : ProjectDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
