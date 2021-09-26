import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tutorials } from 'src/app/dashboard/models/tutorials.model';
import * as firebase from 'firebase';
import { Router } from "@angular/router";;

@Injectable({
	providedIn: 'root'
})
export class TutorialsService {

	constructor(
		private firestore: AngularFirestore,
		public router: Router, 
		) { }

	getTutorials() {
		return this.firestore.collection('tutorials').snapshotChanges();
	}

	getSlides(param:any) {
		return this.firestore.collection(`tutorials/${param}/slides`).snapshotChanges();
	}

	createProduct(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const tutorial_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`tutorials`).doc(tutorial_id).set({
			id : tutorial_id,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			tutorial_title: data.tutorial_title,
			tutorial_category: data.tutorial_category,
			tutorial_image: "assets/img/tutorial-default.svg",
			tutorial_rating: 0,
			tutorial_views: 0
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/tutorial', tutorial_id]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	createTutorialSlide(data:any, param:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const slide_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`tutorials/${param}/slides`).doc(slide_id).set({
			id : slide_id,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			slide_number: data.slide_number,
			slide_title: data.slide_title,
			slide_description: data.slide_description,
			slide_image: "assets/img/tutorial-slide-default.svg"
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/tutorial', param]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}
}
