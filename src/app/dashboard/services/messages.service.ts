import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Messages } from 'src/app/dashboard/models/messages.model';
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {



  constructor(
  	private firestore: AngularFirestore,
		public router: Router, 
  	) { }

  getMessages() {
		return this.firestore.collection('messages').snapshotChanges();
	}

	createMessage(data:any, param:any) {


		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		const message_id = text;

		console.log(param);

		// Add a new document in collection "cities"
		return this.firestore
		.collection(`messages/${param}/main`).doc(message_id).set({
			message_id : message_id,
			message_main : data.message_main,
			date : firebase.default.firestore.FieldValue.serverTimestamp(),
			user_account : 1,
		})
		.then(() => {
			console.log("User Sent message!");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
	}
}
