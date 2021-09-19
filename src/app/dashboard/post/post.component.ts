import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostsService } from 'src/app/dashboard/services/posts.service';
import { Posts } from 'src/app/dashboard/models/posts.model';


import {finalize} from 'rxjs/operators'
export interface imageData{
	fileName: string;
	filePath: string;
	size: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	postRef!: AngularFirestoreCollection<Posts>;
	post$!: Observable<Posts[]>;
	postsID: any[] = [];
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
  	public postsService: PostsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private storage: AngularFireStorage,
		public formBuilder: FormBuilder
  	) { 
  	this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.postID
		});
  }

  ngOnInit(): void {

  	this.postRef = this.db.collection<{}>('posts', ref => ref.where('id', '==', this.parameterValue));
		this.post$ = this.postRef.snapshotChanges().pipe(
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

		const path =  `posts/${new Date().getTime()}_${fileName.name}`;

		var fileRef = this.storage.ref(path);

		this.imageUpload = this.storage.upload(path,fileName);

		this.imageUpload.then( res=>{
			var imagefile = res.task.snapshot.ref.getDownloadURL();
			imagefile.then( downloadableUrl=>{
				console.log("URL", downloadableUrl);
				this.db.doc(`posts/${param}`).update({
					post_image: downloadableUrl
				});
			})
		})
	}

}
