import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CombosService } from 'src/app/dashboard/services/combos.service';
import { Combos } from 'src/app/dashboard/models/combos.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-combo',
  templateUrl: './new-combo.component.html',
  styleUrls: ['./new-combo.component.css']
})
export class NewComboComponent implements OnInit {

	public comboForm: FormGroup;
	combos:any;

  constructor(
  	public db: AngularFirestore,
		public formBuilder: FormBuilder,
		public comboService: CombosService,
  	) { 
  	this.comboForm = this.formBuilder.group({
			combo_title: [''],
			combo_price: [''],
			combo_description: [''],
			combo_category: [''],
		});
  }

  ngOnInit(): void {

  	this.comboService.getCombos().subscribe((data) => {
			this.combos = data.map((e) => {
				return {
					id: e.payload.doc.id,
					...(e.payload.doc.data() as {}),
				} as Combos;
			});
		});
  }

  get combo_title(){
		return this.comboForm.get('combo_title')
	}
	get combo_price(){
		return this.comboForm.get('combo_price')
	}
	get combo_description(){
		return this.comboForm.get('combo_description')
	}
	get combo_category(){
		return this.comboForm.get('combo_category')
	}


  onSubmit() {
		console.log(this.comboForm.value);
		this.comboService.createCombo(this.comboForm.value);
	}

}
