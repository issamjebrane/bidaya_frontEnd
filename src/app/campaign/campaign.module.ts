import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import {ProjectCreationComponent} from "./project-creation/project-creation.component";
import {AppModule} from "../app.module";
import { StepsComponent } from './steps/steps.component';
import {MatIcon} from "@angular/material/icon";
import { StoryComponent } from './story/story.component';
import { BasicsComponent } from './basics/basics.component';
import { RewardsComponent } from './rewards/rewards.component';
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
      ProjectCreationComponent,
      StepsComponent,
      StoryComponent,
      BasicsComponent,
      RewardsComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    AppModule,
    MatIcon,
    MatFormField,
    MatSelect,
    MatFormFieldModule,
    MatOption,
    MatLabel,
    FormsModule,
    NgOptimizedImage
  ]
})
export class CampaignModule { }
