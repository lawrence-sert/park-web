import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipesService } from 'src/app/dashboard/services/recipes.service';
import { Recipes } from 'src/app/dashboard/models/recipes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface imageData{
	fileName: string;
	filePath: string;
	size: string;
}

@Component({
	selector: 'app-new-recipe',
	templateUrl: './new-recipe.component.html',
	styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

	public recipeForm: FormGroup;

	recipes:any; 

	constructor(
		public db: AngularFirestore,
		public formBuilder: FormBuilder,
		public recipesService: RecipesService,
		) { 
		this.recipeForm = this.formBuilder.group({
			recipe_level: [''],
			recipe_time: [''],
			recipe_description: [''],
			recipe_category: [''],
			recipe_name: [''],
			recipe_people: [''],
			recipe_image: [''],
			recipe_like: [''],
			recipe_chef: ['']
		})
	}

	ngOnInit(): void {

		this.recipesService.getRecipes().subscribe((data) => {
			this.recipes = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Recipes;
			});
		});
	}


	get recipe_level(){
		return this.recipeForm.get('recipe_level')
	}

	get recipe_category(){
		return this.recipeForm.get('recipe_category')
	}

	get recipe_time(){
		return this.recipeForm.get('recipe_time')
	}

	get recipe_description(){
		return this.recipeForm.get('recipe_description')
	}

	get recipe_name(){
		return this.recipeForm.get('recipe_name')
	}

	get recipe_people(){
		return this.recipeForm.get('recipe_people')
	}

	get recipe_image(){
		return this.recipeForm.get('recipe_image')
	}

	get recipe_like(){
		return this.recipeForm.get('recipe_like')
	}

	get recipe_chef(){
		return this.recipeForm.get('recipe_chef')
	}


	onSubmit() {
		console.log(this.recipeForm.value);
		this.recipesService.createRecipe(this.recipeForm.value);
	}




}
