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
	public productCatForm: FormGroup;
	products:any;
	products_categories:any;

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

		this.productCatForm = this.formBuilder.group({
			category_name: [''],
			category_description: ['']
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

		this.productsService.getProductCategories().subscribe((data) => {
			this.products_categories = data.map((e) => {
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

	get category_name(){
		return this.productCatForm.get('category_name')
	}

	get category_description(){
		return this.productCatForm.get('category_description')
	}


	onSubmit() {
		console.log(this.productForm.value);
		this.productsService.createProduct(this.productForm.value);
	}

	onSubmitProductCat() {
		console.log(this.productCatForm.value);
		this.productsService.createProductCat(this.productCatForm.value);
	}

}
