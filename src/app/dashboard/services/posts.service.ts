import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Posts } from 'src/app/dashboard/models/posts.model';
import { PostsCats } from 'src/app/dashboard/models/posts-cats.model';
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

  getPosts() {
		return this.firestore.collection('posts').snapshotChanges();
	}

	getPostCats() {
		return this.firestore.collection('posts_cat').snapshotChanges();
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
			post_image : "assets/img/post-default-cover.svg",
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

	createPostCat(data:any) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const postsc_id = text;

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`posts_cat`).doc(postsc_id).set({
			id : postsc_id,
			postc_title : data.postc_title,
			postc_descr : data.postc_description,
			post_category : data.post_category,
			postc_like : 0,
			postc_date : firebase.default.firestore.FieldValue.serverTimestamp(),
			postc_image : "assets/img/postcat.svg"
		})
		.then(() => {
			console.log("Document successfully written!");
			this.router.navigate(['/post-cat', postsc_id]);
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}

}

