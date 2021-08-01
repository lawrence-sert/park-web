import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";


import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  p: number = 1;
	products: Products[] = [];


  constructor(
  	private toastr: ToastrService,
  	public formBuilder: FormBuilder,
    public router: Router,
  	private productsService: ProductsService
  	) { }

  ngOnInit(): void {
  	//read products 
    this.productsService.getProducts().subscribe((data) => {
      this.products = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Products;
      });
    });
  }

}
