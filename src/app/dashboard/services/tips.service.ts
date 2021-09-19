import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tips } from 'src/app/dashboard/models/tips.model';
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class TipsService {

	constructor(
		private firestore: AngularFirestore,
		public router: Router, 
		) { }


	getTips() {
		return this.firestore.collection('tips').snapshotChanges();
	}


	createTip(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const tips_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`tips`).doc(tips_id).set({
			id : tips_id,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			image : "assets/img/tip-holder.svg",
			main : data.main,
			rating : 0,
			tip : data.tip,
			category : data.category
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/tip', tips_id]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

}
