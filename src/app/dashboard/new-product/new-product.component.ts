import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/dashboard/services/products.service';
import { Products } from 'src/app/dashboard/models/products.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-new-product',
	templateUrl: './new-product.component.html',
	styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

	public productForm: FormGroup;
	products:any;

	constructor(
		public db: AngularFirestore,
		public formBuilder: FormBuilder,
		public productsService: ProductsService,
		) { 
		this.productForm = this.formBuilder.group({
			caption: [''],
			category: [''],
			description: [''],
			item: [''],
			price: ['']
		});
	}

	ngOnInit(): void {

		this.productsService.getProducts().subscribe((data) => {
			this.products = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Products;
			});
		});

	}

	get caption(){
		return this.productForm.get('caption')
	}

	get category(){
		return this.productForm.get('category')
	}

	get description(){
		return this.productForm.get('description')
	}

	get item(){
		return this.productForm.get('item')
	}

	get price(){
		return this.productForm.get('price')
	}


	onSubmit() {
		console.log(this.productForm.value);
		this.productsService.createProduct(this.productForm.value);
	}

}
