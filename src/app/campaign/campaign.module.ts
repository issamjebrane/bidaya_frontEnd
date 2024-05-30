import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import {ProjectCreationComponent} from "./project-creation/project-creation.component";
import {AppModule} from "../app.module";
import { StepsComponent } from './steps/steps.component';


@NgModule({
  declarations: [
      ProjectCreationComponent,
      StepsComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    AppModule
  ]
})
export class CampaignModule { }
