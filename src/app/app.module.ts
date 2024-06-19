import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';
import { HomeComponent } from './home/home.component';
import {CommonModule, NgOptimizedImage, registerLocaleData} from '@angular/common';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { CardsContainerComponent } from './shared/cards-container/cards-container.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import {AuthModule} from "./auth/auth.module";
import {HttpClientModule} from '@angular/common/http';
import {CampaignRoutingModule} from "./campaign/campaign-routing.module";
import {CampaignModule} from "./campaign/campaign.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');


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
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        AuthModule,
        AppRoutingModule,
        AuthRoutingModule,
        CampaignRoutingModule,
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule,
    ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
