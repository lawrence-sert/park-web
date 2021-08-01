import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscriptions } from 'src/app/models/subscriptions.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(
		private firestore: AngularFirestore
		) {}

  createSubscription(subscription: Subscriptions) {
		return this.firestore.collection('subscriptions').add(subscription);
		return this.firestore
		.collection("subscription")
		.add({
			id: subscription.date,
			email: subscription.email,
			location: subscription.location

		});
	}
}


