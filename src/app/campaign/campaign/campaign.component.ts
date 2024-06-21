import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Routes, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.sass'
})
export class CampaignComponent implements OnInit {
  isLoading: boolean = false;
  url!:UrlSegment[];
  fullPathUrl : string ='';
  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {this.url = url})
    console.log(window.location.href)
  }
  copyLink() {
    this.fullPathUrl = window.location.href;
  }

}
