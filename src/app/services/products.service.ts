import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Products } from 'src/app/models/products.model';

@Injectable({
	providedIn: 'root'
})
export class ProductsService {

	constructor(
		private firestore: AngularFirestore
		) {}

	getProducts() {
		return this.firestore.collection('products').snapshotChanges();
	}

	createProduct(product: Products) {
		return this.firestore.collection('products').add(product);
		return this.firestore
		.collection("product")
		.add({
			id: product.id,
			Item: product.Item,
			Category: product.Category,
			Caption: product.Caption,
			Description: product.Description,
			Price: product.Price
		});
	}

	updateProducts(product: Products) {
		delete product.id;
		this.firestore
		.doc('product/' + product.id)
		.update(product);
	}
	deleteProducts(beefId: string) {
		this.firestore.doc('product/' + beefId).delete();
	}
}
