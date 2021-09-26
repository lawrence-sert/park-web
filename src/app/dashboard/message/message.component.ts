import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MessagesService } from 'src/app/dashboard/services/messages.service';
import { Messages } from 'src/app/dashboard/models/messages.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

	public messageForm: FormGroup;

	messageRef!: AngularFirestoreCollection<Messages>;
	message$!: Observable<Messages[]>;
	messageID: any[] = [];
	public parameterValue: any[] = [];

  constructor(
  	public messageService: MessagesService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public db: AngularFirestore,
		private storage: AngularFireStorage,
		public formBuilder: FormBuilder
  	) {

  		this.activatedRoute.params.subscribe(parameter => {
			this.parameterValue = parameter.messageID;
			const param = parameter.messageID; 
		});

		this.messageForm = this.formBuilder.group({
			message_main: [''],
		});

  	 }

  ngOnInit(): void {
  	const param = this.parameterValue;
  	this.messageRef = this.db.collection<{}>(`messages/${param}/main`, ref => ref.orderBy('date', 'asc'));
		this.message$ = this.messageRef.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data(); // DB Questions
				const id = a.payload.doc.id;
				return { id, ...data };
			}))
			);
  }

  get message_main(){
		return this.messageForm.get('message_main')
	}

	onSubmit() {
		const param = this.parameterValue;
		console.log(this.messageForm.value);
		this.messageService.createMessage(this.messageForm.value, param);
	}

}
