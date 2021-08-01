import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


//ngx addons
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';


import { HomeComponent } from 'src/app/main/home/home.component';
import { NoPageFoundComponent } from 'src/app/main/no-page-found/no-page-found.component';
import { BasketCreateComponent } from 'src/app/basket/basket-create/basket-create.component';
import { BasketSummaryComponent } from 'src/app/basket/basket-summary/basket-summary.component';
import { AboutComponent } from './main/about/about.component';
import { ContactsComponent } from './main/contacts/contacts.component';
import { TermsAndConditionsComponent } from './main/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './main/privacy-policy/privacy-policy.component';
import { FaqComponent } from './main/faq/faq.component';
import { CookiesPolicyComponent } from './main/cookies-policy/cookies-policy.component';
import { FarmerRegComponent } from './farmer/farmer-reg/farmer-reg.component';
import { VendorRegComponent } from './vendor/vendor-reg/vendor-reg.component';
import { WhatWeDoComponent } from './main/what-we-do/what-we-do.component';
import { MarketPlaceComponent } from './market/market-place/market-place.component';
import { ShopComponent } from './market/shop/shop.component';
import { BoardOfDirectorsComponent } from './main/board-of-directors/board-of-directors.component';
import { MobileAppComponent } from './main/mobile-app/mobile-app.component';

@NgModule({
  declarations: [
  AppComponent,
  HomeComponent,
  BasketCreateComponent,
  BasketSummaryComponent,
  NoPageFoundComponent,
  AboutComponent,
  ContactsComponent,
  TermsAndConditionsComponent,
  PrivacyPolicyComponent,
  FaqComponent,
  CookiesPolicyComponent,
  FarmerRegComponent,
  VendorRegComponent,
  WhatWeDoComponent,
  MarketPlaceComponent,
  ShopComponent,
  BoardOfDirectorsComponent,
  MobileAppComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  FormsModule,
  BrowserAnimationsModule, // required animations module
  ToastrModule.forRoot(), // ToastrModule added
  NgxPaginationModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
