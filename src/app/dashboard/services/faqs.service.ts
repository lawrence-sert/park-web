import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Faqs } from 'src/app/dashboard/models/faqs.model';
import * as firebase from 'firebase';
import { Router } from "@angular/router";;

@Injectable({
	providedIn: 'root'
})
export class FaqsService {

	constructor(
		private firestore: AngularFirestore,
		public router: Router, 
		) { }

	getFaqs() {
		return this.firestore.collection('faqs').snapshotChanges();
	}

	createFaq(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const faq_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`faqs`).doc(faq_id).set({
			id : faq_id,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			faq_question: data.faq_question,
			faq_response: data.faq_response,
			faq_image: "assets/img/faq-default.svg",
			faq_rating: 0,
			faq_category: data.faq_category
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/faqs', faq_id]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}
}
