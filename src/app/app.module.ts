import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';
import { HomeComponent } from './home/home.component';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { CardsContainerComponent } from './shared/cards-container/cards-container.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import {AuthModule} from "./auth/auth.module";
import {HttpClientModule} from '@angular/common/http';
import {CampaignRoutingModule} from "./campaign/campaign-routing.module";
import {CampaignModule} from "./campaign/campaign.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    PagesLayoutComponent,
    HomeComponent,
    CardsContainerComponent,
    PageNotFoundComponent,
  ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        SharedModule,
        AuthModule,
        AppRoutingModule,
        CampaignModule,
        AuthRoutingModule,
        CampaignRoutingModule,
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule,
    ],
  providers: [
  ],
  bootstrap: [AppComponent],
    exports: [
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
