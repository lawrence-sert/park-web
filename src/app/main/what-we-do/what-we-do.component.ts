import { Component, OnInit } from '@angular/core';

import { ProjectsService } from 'src/app/services/projects.service';
import { Projects } from 'src/app/models/projects.model';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.css']
})
export class WhatWeDoComponent implements OnInit {

	projects: Projects[] = [];
  constructor(
  	private projectsService: ProjectsService
  	) { }

  ngOnInit(): void {
  	//read projects 
    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Projects;
      });
    });
  }

}
