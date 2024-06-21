// campaign-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCreationComponent } from './project-creation/project-creation.component';
import { authGuard } from '../auth.guard';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignNotFoundComponent } from './campaign-not-found/campaign-not-found.component';

const routes: Routes = [
  {
    path: 'start-a-campaign',
    component: ProjectCreationComponent,
    canActivate: [authGuard],
  },
  {
    path: ':campaignTitle',
    component: CampaignComponent,
  },
  {
    path: '**',
    component: CampaignNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
