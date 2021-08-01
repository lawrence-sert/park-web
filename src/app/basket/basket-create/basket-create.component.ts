import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";


import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Subscriptions } from 'src/app/models/subscriptions.model';

@Component({
  selector: 'app-basket-create',
  templateUrl: './basket-create.component.html',
  styleUrls: ['./basket-create.component.css']
})
export class BasketCreateComponent implements OnInit {

	public subscriptionForm: FormGroup;

	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
  	private toastr: ToastrService,
  	public formBuilder: FormBuilder,
    public router: Router,
  	private subscriptionsServices: SubscriptionsService
  	) { 
  	this.subscriptionForm = this.formBuilder.group({
      date: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      location: ['']
    })
  }

  ngOnInit(): void {
  }

  // Form Getters
  get email(){
    return this.subscriptionForm.get('email')
  }

  onSubmit() {
    this.subscriptionsServices.createSubscription(this.subscriptionForm.value);
    this.toastr.success('Successfully Added A New Recipe', 'Toastr fun!');
  };

}
