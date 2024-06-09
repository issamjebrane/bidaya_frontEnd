import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CampaignRoutingModule } from './campaign-routing.module';
import {ProjectCreationComponent} from "./project-creation/project-creation.component";
import {AppModule} from "../app.module";
import { StepsComponent } from './steps/steps.component';
import { StoryComponent } from './story/story.component';
import { BasicsComponent } from './basics/basics.component';
import { RewardsComponent } from './rewards/rewards.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SafePipe} from "./safe.pipe";
import { BasicEditorComponent } from './basic-editor/basic-editor.component';
import {NgxTiptapModule} from "ngx-tiptap";


@NgModule({
  declarations: [
      ProjectCreationComponent,
      StepsComponent,
      StoryComponent,
      BasicsComponent,
      RewardsComponent,
      SafePipe,
      BasicEditorComponent
  ],
    imports: [
      ReactiveFormsModule,
      CommonModule,
      CampaignRoutingModule,
      AppModule,
      FormsModule,
      NgOptimizedImage,
      NgxTiptapModule
    ]
})
export class CampaignModule { }
