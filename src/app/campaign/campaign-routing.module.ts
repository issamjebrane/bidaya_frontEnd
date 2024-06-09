import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectCreationComponent} from "./project-creation/project-creation.component";
import {authGuard} from "../auth.guard";

const routes: Routes = [
  {
    component:ProjectCreationComponent,
    path:"start-a-campaign",
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
