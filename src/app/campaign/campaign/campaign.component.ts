import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Routes, UrlSegment} from "@angular/router";
import {ProjectService} from "../../services/project/project.service";

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.sass'
})
export class CampaignComponent implements OnInit {
  isLoading: boolean = false;
  url!:UrlSegment[];
  fullPathUrl : string ='';
  constructor(private route:ActivatedRoute, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {this.url = url})
    if(this.url[0].path) {
      this.projectService.getProject(28).subscribe((project: any) => {
        console.log(project);
      });
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1);
  }
  copyLink() {
    this.fullPathUrl = window.location.href;
  }

}
