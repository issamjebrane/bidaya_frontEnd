import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-campaign-not-found',
  templateUrl: './campaign-not-found.component.html',
  styleUrl: './campaign-not-found.component.sass'
})
export class CampaignNotFoundComponent {

constructor(private router: Router) { }

  goHome() {
    //go home
    this.router.navigate(['/home'])
  }
}
