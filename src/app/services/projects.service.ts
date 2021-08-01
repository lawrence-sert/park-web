import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Projects } from 'src/app/models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
  		private firestore: AngularFirestore
  	) { }

  getProjects() {
		return this.firestore.collection('projects').snapshotChanges();
	}
}
