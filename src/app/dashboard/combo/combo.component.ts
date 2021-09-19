import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CombosService } from 'src/app/dashboard/services/combos.service';
import { Combos } from 'src/app/dashboard/models/combos.model';

import { ProductsService } from 'src/app/dashboard/services/products.service';
import {Products} from 'src/app/dashboard/models/products.model';


import {finalize} from 'rxjs/operators'
export interface imageData{
	fileName: string;
	filePath: string;
	size: string;
}

@Component({
	selector: 'app-combo',
	templateUrl: './combo.component.html',
	styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {

	comboRef!: AngularFirestoreCollection<Combos>;
	combo$!: Observable<Combos[]>;
	combosID: any[] = [];
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


	public comboItemForm: FormGroup;

	cate:any;
	products:any;

	constructor(
		public combosService: CombosService,
		public productsService: ProductsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private storage: AngularFireStorage,
		public formBuilder: FormBuilder,
		) { 
		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.comboID
		});

		this.comboItemForm = this.formBuilder.group({
			id: [''],
			item: [''],
			price: [''],
		});
	}

	ngOnInit(): void {
		this.comboRef = this.db.collection<{}>('combos', ref => ref.where('id', '==', this.parameterValue));
		this.combo$ = this.comboRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		this.productsService.getProducts().subscribe((data) => {
			this.products = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Products;
			});
		});

		
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

		const path =  `combos/${new Date().getTime()}_${fileName.name}`;

		var fileRef = this.storage.ref(path);

		this.imageUpload = this.storage.upload(path,fileName);

		this.imageUpload.then( res=>{
			var imagefile = res.task.snapshot.ref.getDownloadURL();
			imagefile.then( downloadableUrl=>{
				console.log("URL", downloadableUrl);
				this.db.doc(`combos/${param}`).update({
					combo_image: downloadableUrl
				});
			})
		})
	}


	get id(){
		return this.comboItemForm.get('id')
	}

	get item(){
		return this.comboItemForm.get('item')
	}
	get price(){
		return this.comboItemForm.get('price')
	}



	onSubmit() {
		const param = this.parameterValue;
		this.combosService.addComboItem(this.comboItemForm.value, param);
	}

}
