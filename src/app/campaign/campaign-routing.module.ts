import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectCreationComponent} from "./project-creation/project-creation.component";

const routes: Routes = [
  {
    component:ProjectCreationComponent,
    path:"start-a-campaign"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
