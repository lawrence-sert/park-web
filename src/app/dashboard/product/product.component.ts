import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductsService } from 'src/app/dashboard/services/products.service';
import {Products} from 'src/app/dashboard/models/products.model';


import {finalize} from 'rxjs/operators'
export interface imageData{
	fileName: string;
	filePath: string;
	size: string;
}

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	productRef!: AngularFirestoreCollection<Products>;
	product$!: Observable<Products[]>;
	productID: any[] = [];
	public parameterValue: any[] = [];

	fileName!:string;
	fileSize!: string;
	isLoading!:boolean;
	isLoaded!: boolean;
	private imageCollection!: AngularFirestoreCollection<imageData>;
	imagefile!: Observable<imageData[]>;
	imageUpload!: AngularFireUploadTask;
	percentage!: Observable<number>;
	snapshot!: Observable<any>;
	FileImageUPload!: Observable<any>;
	UserUID!: AngularFirestoreDocument;

	constructor(
		public productsService: ProductsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private storage: AngularFireStorage,
		public formBuilder: FormBuilder,
		) { 
		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.productID
		});
	}

	ngOnInit(): void {

		this.productRef = this.db.collection<{}>('products', ref => ref.where('id', '==', this.parameterValue));
		this.product$ = this.productRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

	}

	async uploadImagetoFirebase(event:any){


		const param = this.parameterValue;
		const file = event.target.files;
		console.log(file);
		var fileName = file[0];
		console.log(fileName);

		if(fileName.type.split('/')[0] !=="image" ){
			console.error("File is not an Image");
			return;
		}

		this.isLoading = true;
		this.isLoaded = false;

		const path =  `recipes/${new Date().getTime()}_${fileName.name}`;

		var fileRef = this.storage.ref(path);

		this.imageUpload = this.storage.upload(path,fileName);

		this.imageUpload.then( res=>{
			var imagefile = res.task.snapshot.ref.getDownloadURL();
			imagefile.then( downloadableUrl=>{
				console.log("URL", downloadableUrl);
				this.db.doc(`recipes/${param}`).update({
					recipe_image: downloadableUrl
				});
			})
		})
	}

}
