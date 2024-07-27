import {Component, OnInit} from '@angular/core';
import {Campaign} from "../../../types/campaign.types";
import {ProjectService} from "../../services/project/project.service";
import {DatePipe} from "@angular/common";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.sass',
  providers: [DatePipe]
})
export class ProjectDashboardComponent implements OnInit{
  projects: Campaign[] = [] as Campaign[];
  isLoading: boolean = true;
  isDeleted: boolean = false;
  currentDate: string | null = '';
  date:Date = new Date();
  isDeleting: boolean = false;
  constructor(private projectService: ProjectService,private datePipe: DatePipe) {
  }
  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjectsWithPage().subscribe({
      next: (data: Campaign[]) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (err: Error) => console.error(err)
    })
  }

  delete(id: number | undefined) {
    if(id !== undefined)
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.isDeleted = true;
      },
      error: (err: Error) => console.error(err)
    })
  }

  toggleDelete() {
    this.isDeleting = !this.isDeleting;
  }

  refresh() {
    this.isLoading = true;
    this.getProjects();
  }
  getProjectsOnPage(page: number, limit: number) {
    this.isLoading = true;
    this.projectService.getProjectsWithPage(page, limit).subscribe({
      next: (data: Campaign[]) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (err: Error) => console.error(err)
    })

  }
}
