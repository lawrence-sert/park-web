import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TutorialsService } from 'src/app/dashboard/services/tutorials.service';
import { Tutorials } from 'src/app/dashboard/models/tutorials.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-new-tutorial',
	templateUrl: './new-tutorial.component.html',
	styleUrls: ['./new-tutorial.component.css']
})
export class NewTutorialComponent implements OnInit {

	public tutorialForm: FormGroup;
	tutorials : any;

	constructor(
		public db: AngularFirestore,
		public formBuilder: FormBuilder,
		public tutorialsService: TutorialsService,
		) { 
		this.tutorialForm = this.formBuilder.group({
			tutorial_title: [''],
			tutorial_category: ['']
		});
	}

	ngOnInit(): void {

		this.tutorialsService.getTutorials().subscribe((data) => {
			this.tutorials = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Tutorials;
			});
		});
	}

	get tutorial_title(){
		return this.tutorialForm.get('tutorial_title')
	}


	get tutorial_category(){
		return this.tutorialForm.get('tutorial_category')
	}


	onSubmit() {
		console.log(this.tutorialForm.value);
		this.tutorialsService.createProduct(this.tutorialForm.value);
	}

}

