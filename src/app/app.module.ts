import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { CardsContainerComponent } from './shared/cards-container/cards-container.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthRoutingModule } from './auth/auth-routing.module';
import {AuthModule} from "./auth/auth.module";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PagesLayoutComponent,
    HomeComponent,
    NavMenuComponent,
    CardsContainerComponent,
  ],
  imports: [
    HttpClientModule,
    MatProgressBarModule,
    MatIconModule,
    BrowserModule,
    CommonModule,
    AuthModule,
    AppRoutingModule,
    AuthRoutingModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
