import { NgModule } from '@angular/core';
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
import {HeaderComponent} from "../shared/header/header.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
      ProjectCreationComponent,
      StepsComponent,
      StoryComponent,
      BasicsComponent,
      RewardsComponent,
      SafePipe,
      BasicEditorComponent,
      CampaignComponent,
      CampaignNotFoundComponent
  ],
    imports: [
      ReactiveFormsModule,
      SharedModule,
      CommonModule,
      CampaignRoutingModule,
      FormsModule,
      NgOptimizedImage,
      NgxTiptapModule,
    ]
})
export class CampaignModule { }
