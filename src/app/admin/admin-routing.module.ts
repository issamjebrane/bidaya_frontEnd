import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {UserDashboardComponent} from "./user-dashboard/user-dashboard.component";
import {ProjectDashboardComponent} from "./project-dashboard/project-dashboard.component";
import {adminGuard} from "../auth.guard";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {UpdateProjectComponent} from "./update-project/update-project.component";
import {NewUserComponent} from "./new-user/new-user.component";

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
        path:'users/add-user',
        component: NewUserComponent
      },
      {
        path:'users/:id',
        component:UpdateUserComponent
      },
      {
        path:'projects',
        component : ProjectDashboardComponent
      },
      {
        path:'projects/:id',
        component:UpdateProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
