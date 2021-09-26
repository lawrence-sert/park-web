import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessagesService } from 'src/app/dashboard/services/messages.service';
import { Messages } from 'src/app/dashboard/models/messages.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

	public messageForm: FormGroup;
	messages:any;


  constructor(
  	public db: AngularFirestore,
		public formBuilder: FormBuilder,
		public messagesService: MessagesService,
  	) { 
  	this.messageForm = this.formBuilder.group({
			message_main: [''],
			user_id: [''],
		});
  }

  ngOnInit(): void {
  	this.messagesService.getMessages().subscribe((data) => {
			this.messages = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Messages;
			});
		});
  }

}
