import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Promotions } from 'src/app/dashboard/models/promotions.model';
import * as firebase from 'firebase';
import { Router } from "@angular/router";;

@Injectable({
	providedIn: 'root'
})
export class PromotionsService {

	constructor(
		private firestore: AngularFirestore,
		public router: Router, 
		) { }

	getPromotions() {
		return this.firestore.collection('promotions').snapshotChanges();
	}

	createPromotion(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const promotion_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`promotions`).doc(promotion_id).set({
			id : promotion_id,
			promotion_date : firebase.default.firestore.FieldValue.serverTimestamp(),
			promotion_category : data.promotion_category,
			promotion_comments : 0,
			promotion_description : data.promotion_description,
			promotion_end : data.promotion_end,
			promotion_image : "assets/img/promotion-default.svg",
			promotion_likes : 0,
			promotion_name : data.promotion_name,
			promotion_start : data.promotion_start,
			promotion_active : true
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/promotion', promotion_id]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}


}
