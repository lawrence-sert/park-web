import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecipesService } from 'src/app/dashboard/services/recipes.service';
import {Recipes} from 'src/app/dashboard/models/recipes.model';


import {finalize} from 'rxjs/operators'
export interface imageData{
	fileName: string;
	filePath: string;
	size: string;
}

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

	recipeRef!: AngularFirestoreCollection<Recipes>;
	recipe$!: Observable<Recipes[]>;
	recipeID: any[] = [];
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

	public ingredientForm: FormGroup;
	public methodForm: FormGroup;
	public nutrientsForm: FormGroup;

	allIngredients: Recipes[] = [];
	ingredients : any;

	allMethods: Recipes[] = [];
	methods : any;

	allNutrients: Recipes[] = [];
	nutrients : any;

	


	constructor(
		public recipesService: RecipesService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private storage: AngularFireStorage,
		public formBuilder: FormBuilder,
		) { 
		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.recipeID
		});

		this.ingredientForm = this.formBuilder.group({
			ingredient_name: [''],

		});

		this.methodForm = this.formBuilder.group({
			method_number: [''],
			method_main: ['']
		});

		this.nutrientsForm = this.formBuilder.group({
			nutrition_name: [''],
			nutrition_value: [''],
			nutrition_description: [''],
		});
	}

	ngOnInit(): void {
		this.recipeRef = this.db.collection<{}>('recipes', ref => ref.where('id', '==', this.parameterValue));
		this.recipe$ = this.recipeRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);

		//Veggies Queries
		const param = this.parameterValue
		this.ingredients = this.db.collection(`recipes/${param}/ingredient`)
		.valueChanges({ idField: 'id'})
		.subscribe((recipes) => {
			this.allIngredients = recipes;
		});

		//Veggies Queries
		this.methods = this.db.collection(`recipes/${param}/method`)
		.valueChanges({ idField: 'id'})
		.subscribe((recipes) => {
			this.allMethods = recipes;
		});

		this.nutrients = this.db.collection(`recipes/${param}/nutrition`)
		.valueChanges({ idField: 'id'})
		.subscribe((recipes) => {
			this.allNutrients = recipes;
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

	get ingredient_name(){
		return this.ingredientForm.get('ingredient_name')
	}

	get method_number(){
		return this.methodForm.get('method_number')
	}

	get method_main(){
		return this.methodForm.get('method_main')
	}

	get nutrition_name(){
		return this.nutrientsForm.get('nutrition_name')
	}

	get nutrition_value(){
		return this.nutrientsForm.get('nutrition_value')
	}

	get nutrition_description(){
		return this.nutrientsForm.get('nutrition_description')
	}




	onSubmit() {
		const param = this.parameterValue;
		this.recipesService.addIngredient(this.ingredientForm.value, param);
	}

	onSubmitMethod() {
		const param = this.parameterValue;
		this.recipesService.addMethod(this.methodForm.value, param);
	}

	onSubmitNutrients() {
		const param = this.parameterValue;
		this.recipesService.addNutrients(this.nutrientsForm.value, param);
	}

}
