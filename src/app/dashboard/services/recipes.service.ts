import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipes } from 'src/app/dashboard/models/recipes.model';
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class RecipesService {

	constructor(
		private firestore: AngularFirestore,
		public router: Router, 
		) { }

	getRecipes() {
		return this.firestore.collection('recipes').snapshotChanges();
	}

	createRecipe(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const recipe_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`recipes`).doc(recipe_id).set({
			id : recipe_id,
			recipe_category : data.recipe_category,
			recipe_chef : data.recipe_chef,
			recipe_date : firebase.default.firestore.FieldValue.serverTimestamp(),
			recipe_description : data.recipe_description,
			recipe_image : "assets/img/recipes/demo.png",
			recipe_level : data.recipe_level,
			recipe_like : 0,
			recipe_comment : 0,
			recipe_rating : 0,
			recipe_name : data.recipe_name,
			recipe_people : data.recipe_people,
			recipe_time : data.recipe_time,
			
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/dashboard']);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	addIngredient(data:any, param:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const ingredient_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`recipes/${param}/ingredient`).doc(ingredient_id).set({
			id : ingredient_id,
			ingredient_name : data.ingredient_name,

			
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/recipe', param]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	addMethod(data:any, param:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const method_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`recipes/${param}/method`).doc(method_id).set({
			id : method_id,
			method_number : data.method_number,
			method_main : data.method_main	
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/recipe', param]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

	addNutrients(data:any, param:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const nutrients_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`recipes/${param}/nutrition`).doc(nutrients_id).set({
			id : nutrients_id,
			nutrition_name : data.nutrition_name,
			nutrition_value : data.nutrition_value,
			nutrition_description : data.nutrition_description
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/recipe', param]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}


}
