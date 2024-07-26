import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CampaignRoutingModule } from './campaign-routing.module';
import {ProjectCreationComponent} from "./project-creation/project-creation.component";
import { StepsComponent } from './steps/steps.component';
import { StoryComponent } from './story/story.component';
import { BasicsComponent } from './basics/basics.component';
import { RewardsComponent } from './rewards/rewards.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SafePipe} from "./safe.pipe";
import { BasicEditorComponent } from './basic-editor/basic-editor.component';
import {NgxTiptapModule} from "ngx-tiptap";
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignNotFoundComponent } from './campaign-not-found/campaign-not-found.component';
import {SharedModule} from "../shared/shared.module";
import { CampaignsComponent } from './campaigns/campaigns.component';
import {FundCampaignComponent} from "./fund-campaign/fund-campaign.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "../auth/auth-interceptor.service";

@NgModule({
  declarations: [
      ProjectCreationComponent,
      FundCampaignComponent,
      StepsComponent,
      StoryComponent,
      BasicsComponent,
      RewardsComponent,
      SafePipe,
      BasicEditorComponent,
      CampaignComponent,
      CampaignNotFoundComponent,
      CampaignsComponent
  ],
    imports: [
      ReactiveFormsModule,
      SharedModule,
      CommonModule,
      CampaignRoutingModule,
      FormsModule,
      NgOptimizedImage,
      NgxTiptapModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CampaignModule { }
