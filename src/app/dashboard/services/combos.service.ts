import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Combos } from 'src/app/dashboard/models/combos.model';
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class CombosService {

	constructor(
		private firestore: AngularFirestore,
		public router: Router, 
		) { }

	getCombos() {
		return this.firestore.collection('combos', ref => ref.orderBy('combo_date', 'desc')).snapshotChanges();
	}

	createCombo(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const combo_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`combos`).doc(combo_id).set({
			id : combo_id,
			combo_date : firebase.default.firestore.FieldValue.serverTimestamp(),
			combo_title : data.combo_title,
			combo_price: data.combo_price,
			combo_category: data.combo_category,
			combo_image : "assets/img/combo-default.svg",
			combo_description: data.combo_description,
			combo_views: 0,
			combo_rating: 0,
			combo_comments:0,
			combo_active: false
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/combo', combo_id]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}


	addComboItem(data:any, param:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const cItem_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`combos/${param}/items`).doc(cItem_id).set({
			combo_item_id : cItem_id,
			product_id : data.id
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/combo', param]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}
}
