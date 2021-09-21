import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PromotionsService } from 'src/app/dashboard/services/promotions.service';
import { ProductsService } from 'src/app/dashboard/services/products.service';
import { Promotions } from 'src/app/dashboard/models/promotions.model';
import { ProductCats } from 'src/app/dashboard/models/product-cats.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-promotion',
  templateUrl: './new-promotion.component.html',
  styleUrls: ['./new-promotion.component.css']
})
export class NewPromotionComponent implements OnInit {

	public promotionForm: FormGroup;
	promotions:any;
	productCat:any;



  constructor(
		public db: AngularFirestore,
		public formBuilder: FormBuilder,
		public promotionsService: PromotionsService,
		public productsService: ProductsService,
		) { 
		this.promotionForm = this.formBuilder.group({
			promotion_category: [''],
			promotion_description: [''],
			promotion_end: [''],
			promotion_start: [''],
			promotion_name: ['']
		});

	}

  ngOnInit(): void {
  	this.promotionsService.getPromotions().subscribe((data) => {
			this.promotions = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Promotions;
			});
		});

  	this.productsService.getProductCategories().subscribe((data) => {
			this.productCat = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as ProductCats;
			});
		});

  }


  onSubmit() {
		console.log(this.promotionForm.value);
		this.promotionsService.createPromotion(this.promotionForm.value);
	}

}
