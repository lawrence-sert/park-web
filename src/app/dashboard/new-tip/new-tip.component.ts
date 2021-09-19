import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipsService } from 'src/app/dashboard/services/tips.service';
import { Tips } from 'src/app/dashboard/models/tips.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-new-tip',
	templateUrl: './new-tip.component.html',
	styleUrls: ['./new-tip.component.css']
})
export class NewTipComponent implements OnInit {

	public tipForm: FormGroup;
	tips:any;

	constructor(
		public db: AngularFirestore,
		public formBuilder: FormBuilder,
		public tipsService: TipsService,
		) { 
		this.tipForm = this.formBuilder.group({
			main: [''],
			tip: [''],
			category: ['']
		});
	}

	ngOnInit(): void {
		this.tipsService.getTips().subscribe((data) => {
			this.tips = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Tips;
			});
		});
	}

	get main(){
		return this.tipForm.get('main')
	}

	get tip(){
		return this.tipForm.get('tip')
	}

	get category(){
		return this.tipForm.get('category')
	}

	onSubmit() {
		console.log(this.tipForm.value);
		this.tipsService.createTip(this.tipForm.value);
	}

}
