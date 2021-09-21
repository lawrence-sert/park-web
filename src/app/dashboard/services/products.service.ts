import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Products } from 'src/app/dashboard/models/products.model';
import { ProductCats } from 'src/app/dashboard/models/product-cats.model';
import * as firebase from 'firebase';
import { Router } from "@angular/router";;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
  	private firestore: AngularFirestore,
		public router: Router, 
  	) { }

  getProducts() {
		return this.firestore.collection('products').snapshotChanges();
	}

	getProductCategories() {
		return this.firestore.collection('products_categories').snapshotChanges();
	}

	createProduct(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const product_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`products`).doc(product_id).set({
			id : product_id,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			caption : data.caption,
			category : data.category,
			comments : 0,
			description : data.description,
			image : "assets/img/product-holder.svg",
			item : data.item,
			likes : 0,
			rating : 0,
			price : data.price,
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/product', product_id]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	createProductCat(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const productCat_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`products_categories`).doc(productCat_id).set({
			id : productCat_id,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			category_description : data.category_description,	
			category_name : data.category_name,	
			category_image : "assets/img/product-cat.svg"
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/product-cat', productCat_id]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}
}
