import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase authentication



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
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
