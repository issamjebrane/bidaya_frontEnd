import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {NavMenuComponent} from "./nav-menu/nav-menu.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavMenuComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule { }
