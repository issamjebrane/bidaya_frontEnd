import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ResgiterComponent } from './resgiter/resgiter.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    ResgiterComponent
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class AuthModule { }