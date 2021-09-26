import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FaqsService } from 'src/app/dashboard/services/faqs.service';
import { Faqs } from 'src/app/dashboard/models/faqs.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-new-faqs',
	templateUrl: './new-faqs.component.html',
	styleUrls: ['./new-faqs.component.css']
})
export class NewFaqsComponent implements OnInit {

	public faqForm: FormGroup;
	faqs: any;

	constructor(
		public db: AngularFirestore,
		public formBuilder: FormBuilder,
		public faqsService: FaqsService,
		) { 
		this.faqForm = this.formBuilder.group({
			faq_question: [''],
			faq_response: [''],
			faq_category: ['']
		})
	}

	ngOnInit(): void {

		this.faqsService.getFaqs().subscribe((data) => {
			this.faqs = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Faqs;
			});
		});

	}

	get faq_question(){
		return this.faqForm.get('faq_question')
	}

	get faq_response(){
		return this.faqForm.get('faq_response')
	}

	get faq_category(){
		return this.faqForm.get('faq_category')
	}

	onSubmit() {
		console.log(this.faqForm.value);
		this.faqsService.createFaq(this.faqForm.value);
	}

}
