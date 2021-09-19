import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Posts } from 'src/app/dashboard/models/posts.model';
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
  	private firestore: AngularFirestore,
		public router: Router, 
  	) { }

  getRecipes() {
		return this.firestore.collection('posts').snapshotChanges();
	}

	createPost(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const posts_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`posts`).doc(posts_id).set({
			id : posts_id,
			post_auth : data.post_auth,
			post_category : data.post_category,
			post_comments : 0,
			post_date : firebase.default.firestore.FieldValue.serverTimestamp(),
			post_image : "assets/img/post/demo.png",
			post_main : data.post_main,
			post_title : data.post_title,
			post_views : 0,
			post_rating : 0,
			post_like : 0
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/post', posts_id]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

}

