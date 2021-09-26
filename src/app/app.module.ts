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
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';

import { AuthService } from "src/app/services/auth.service";


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
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { NewRecipeComponent } from './dashboard/new-recipe/new-recipe.component';
import { RecipeComponent } from './dashboard/recipe/recipe.component';
import { NewPostComponent } from './dashboard/new-post/new-post.component';
import { PostComponent } from './dashboard/post/post.component';
import { NewTipComponent } from './dashboard/new-tip/new-tip.component';
import { TipComponent } from './dashboard/tip/tip.component';
import { NewProductComponent } from './dashboard/new-product/new-product.component';
import { ProductComponent } from './dashboard/product/product.component';
import { NewComboComponent } from './dashboard/new-combo/new-combo.component';
import { ComboComponent } from './dashboard/combo/combo.component';
import { PostCatComponent } from './dashboard/post-cat/post-cat.component';
import { ProductCatComponent } from './dashboard/product-cat/product-cat.component';
import { PromotionComponent } from './dashboard/promotion/promotion.component';
import { NewPromotionComponent } from './dashboard/new-promotion/new-promotion.component';
import { FaqsComponent } from './dashboard/faqs/faqs.component';
import { NewFaqsComponent } from './dashboard/new-faqs/new-faqs.component';
import { NewTutorialComponent } from './dashboard/new-tutorial/new-tutorial.component';
import { TutorialComponent } from './dashboard/tutorial/tutorial.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { MessageComponent } from './dashboard/message/message.component';
import { PaymentsComponent } from './dashboard/payments/payments.component';
import { PaymentComponent } from './dashboard/payment/payment.component';


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
  MobileAppComponent,
  DashboardComponent,
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  VerifyEmailComponent,
  NewRecipeComponent,
  RecipeComponent,
  NewPostComponent,
  PostComponent,
  NewTipComponent,
  TipComponent,
  NewProductComponent,
  ProductComponent,
  NewComboComponent,
  ComboComponent,
  PostCatComponent,
  ProductCatComponent,
  PromotionComponent,
  NewPromotionComponent,
  FaqsComponent,
  NewFaqsComponent,
  NewTutorialComponent,
  TutorialComponent,
  MessagesComponent,
  MessageComponent,
  PaymentsComponent,
  PaymentComponent
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
    AngularFireAuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
