import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';
import { HomeComponent } from './home/home.component';
import {CommonModule, NgOptimizedImage, registerLocaleData} from '@angular/common';
import { CardsContainerComponent } from './shared/cards-container/cards-container.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import {AuthModule} from "./auth/auth.module";
import { HttpClientModule} from '@angular/common/http';
import {CampaignRoutingModule} from "./campaign/campaign-routing.module";
import {CampaignModule} from "./campaign/campaign.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {SharedModule} from "./shared/shared.module";
import localeFr from '@angular/common/locales/fr';
import { AboutUsComponent } from './about-us/about-us.component';
import { TestingComponent } from './testing/testing.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { UserDashboardComponent } from './admin/user-dashboard/user-dashboard.component';
import { ProjectDashboardComponent } from './admin/project-dashboard/project-dashboard.component';
import {AdminRoutingModule} from "./admin/admin-routing.module";
import {AdminModule} from "./admin/admin.module";

registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    PagesLayoutComponent,
    HomeComponent,
    CardsContainerComponent,
    PageNotFoundComponent,
    AboutUsComponent,
    TestingComponent,
    AdminLayoutComponent,
    UserDashboardComponent,
    ProjectDashboardComponent,
  ],
    imports: [
        HttpClientModule,
        CommonModule,
        SharedModule,
        AdminModule,
        AuthModule,
        CampaignRoutingModule,
        AuthRoutingModule,
        AdminRoutingModule,
        AppRoutingModule,
        CampaignModule,
        BrowserModule,
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule,
    ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },

  ],
  bootstrap: [AppComponent],
    exports: [
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
