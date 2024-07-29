// campaign-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCreationComponent } from './project-creation/project-creation.component';
import {authGuard, guestGuard} from '../auth.guard';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignNotFoundComponent } from './campaign-not-found/campaign-not-found.component';
import {CampaignsComponent} from "./campaigns/campaigns.component";
import {FundCampaignComponent} from "./fund-campaign/fund-campaign.component";

const routes: Routes = [
  {
    path:'campaign',
    children: [
      {
        path: 'start-a-campaign',
        component: ProjectCreationComponent,
        canActivate: [guestGuard],
      },
      {
        path:'fund/:campaignTitle',
        component:FundCampaignComponent,

      },
      {
        path:'explore',
        component:CampaignsComponent,
      },
      {
        path: ':campaignTitle',
        component: CampaignComponent,
      },
      {
        path: '**',
        component: CampaignNotFoundComponent
      }
      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
