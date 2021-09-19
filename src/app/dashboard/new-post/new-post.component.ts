import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostsService } from 'src/app/dashboard/services/posts.service';
import { Posts } from 'src/app/dashboard/models/posts.model';
import { PostsCats } from 'src/app/dashboard/models/posts-cats.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-new-post',
	templateUrl: './new-post.component.html',
	styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

	public postForm: FormGroup;
	posts:any;
	postsCat:any;

	public postCatForm: FormGroup;

	constructor(
		public db: AngularFirestore,
		public formBuilder: FormBuilder,
		public postService: PostsService,
		) { 
		this.postForm = this.formBuilder.group({
			post_auth: [''],
			post_category: [''],
			post_main: [''],
			post_title: [''],
		});

		this.postCatForm = this.formBuilder.group({
			postc_title: [''],
			postc_description: [''],
			post_category: [''],
		});
	}

	ngOnInit(): void {
		this.postService.getPosts().subscribe((data) => {
			this.posts = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Posts;
			});
		});

		this.postService.getPostCats().subscribe((data) => {
			this.postsCat = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as PostsCats;
			});
		});
	}

	get post_auth(){
		return this.postForm.get('post_auth')
	}

	get post_category(){
		return this.postForm.get('post_category')
	}

	get post_main(){
		return this.postForm.get('post_main')
	}

	get post_title(){
		return this.postForm.get('post_title')
	}

	get postc_title(){
		return this.postCatForm.get('postc_title')
	}

	get postc_description(){
		return this.postCatForm.get('postc_description')
	}




	onSubmit() {
		console.log(this.postForm.value);
		this.postService.createPost(this.postForm.value);
	}

	onSubmitCat() {
		console.log(this.postCatForm.value);
		this.postService.createPostCat(this.postCatForm.value);
	}

}

