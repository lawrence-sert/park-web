import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TutorialsService } from 'src/app/dashboard/services/tutorials.service';
import { Tutorials } from 'src/app/dashboard/models/tutorials.model';


import {finalize} from 'rxjs/operators'
export interface imageData{
	fileName: string;
	filePath: string;
	size: string;
}


@Component({
	selector: 'app-tutorial',
	templateUrl: './tutorial.component.html',
	styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

	public tutorialSlideForm: FormGroup;

	tutorialRef!: AngularFirestoreCollection<Tutorials>;
	tutorial$!: Observable<Tutorials[]>;
	tutorialsID: any[] = [];
	public parameterValue: any[] = [];

	slides: any;

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
		public tutorialsService: TutorialsService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private storage: AngularFireStorage,
		public formBuilder: FormBuilder
		) { 
		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.tutorialID
		});

		this.tutorialSlideForm = this.formBuilder.group({
			slide_number: [''],
			slide_title: [''],
			slide_description: ['']
		});
	}

	ngOnInit(): void {

		this.tutorialRef = this.db.collection<{}>('tutorials', ref => ref.where('id', '==', this.parameterValue));
		this.tutorial$ = this.tutorialRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);


		const param = this.parameterValue;
		this.tutorialsService.getSlides(param).subscribe((data) => {
			this.slides = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Tutorials;
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

		const path =  `tutorials/${new Date().getTime()}_${fileName.name}`;

		var fileRef = this.storage.ref(path);

		this.imageUpload = this.storage.upload(path,fileName);

		this.imageUpload.then( res=>{
			var imagefile = res.task.snapshot.ref.getDownloadURL();
			imagefile.then( downloadableUrl=>{
				console.log("URL", downloadableUrl);
				this.db.doc(`tutorials/${param}`).update({
					tutorial_image: downloadableUrl
				});
			})
		})
	}

	get slide_number(){
		return this.tutorialSlideForm.get('slide_number')
	}

	get slide_title(){
		return this.tutorialSlideForm.get('slide_title')
	}

	get slide_description(){
		return this.tutorialSlideForm.get('slide_description')
	}


	onSubmitTutorialSlide() {
		const param = this.parameterValue;
		console.log(this.tutorialSlideForm.value);
		this.tutorialsService.createTutorialSlide(this.tutorialSlideForm.value, param);
	}

	async uploadSlidetoFirebase(event:any){


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

		const path =  `tutorials/slides/${new Date().getTime()}_${fileName.name}`;

		var fileRef = this.storage.ref(path);

		this.imageUpload = this.storage.upload(path,fileName);

		this.imageUpload.then( res=>{
			var imagefile = res.task.snapshot.ref.getDownloadURL();
			imagefile.then( downloadableUrl=>{
				console.log("URL", downloadableUrl);
				this.db.doc(`tutorials/${param}/slides`).update({
					slide_image: downloadableUrl
				});
			})
		})
	}


}
