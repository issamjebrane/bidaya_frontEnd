import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { NewUserComponent } from './new-user/new-user.component';


@NgModule({
  declarations: [
    UpdateUserComponent,
    UpdateProjectComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
