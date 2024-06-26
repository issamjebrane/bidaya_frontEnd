import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {NavMenuComponent} from "./nav-menu/nav-menu.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { SkeletonComponent } from './skeleton/skeleton.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavMenuComponent,
    SkeletonComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavMenuComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule { }
