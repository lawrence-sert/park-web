import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Main Pages
import { HomeComponent } from 'src/app/main/home/home.component';
import { AboutComponent } from 'src/app/main/about/about.component';
import { BoardOfDirectorsComponent } from 'src/app/main/board-of-directors/board-of-directors.component';
import { WhatWeDoComponent } from 'src/app/main/what-we-do/what-we-do.component';
import { ContactsComponent } from 'src/app/main/contacts/contacts.component';
import { MobileAppComponent } from 'src/app/main/mobile-app/mobile-app.component';
import { FaqComponent } from 'src/app/main/faq/faq.component';
import { TermsAndConditionsComponent } from 'src/app/main/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from 'src/app/main/privacy-policy/privacy-policy.component';
import { CookiesPolicyComponent } from 'src/app/main/cookies-policy/cookies-policy.component';


//Farmer Pages
import { FarmerRegComponent } from 'src/app/farmer/farmer-reg/farmer-reg.component';

//Vendor Pages
import { VendorRegComponent } from 'src/app/vendor/vendor-reg/vendor-reg.component';

//Basket Pages
import { BasketCreateComponent } from 'src/app/basket/basket-create/basket-create.component';
import { BasketSummaryComponent } from 'src/app/basket/basket-summary/basket-summary.component';

//Market Pages
import { MarketPlaceComponent } from 'src/app/market/market-place/market-place.component';
import { ShopComponent } from 'src/app/market/shop/shop.component';

//Application Authentication
import { DashboardComponent } from 'src/app/auth/dashboard/dashboard.component';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'src/app/auth/verify-email/verify-email.component';
import { AuthGuard } from "src/app/guards/auth.guard";

//Admin Pages
import { NewRecipeComponent } from 'src/app/dashboard/new-recipe/new-recipe.component';
import { RecipeComponent } from 'src/app/dashboard/recipe/recipe.component';

import { NewPostComponent } from 'src/app/dashboard/new-post/new-post.component';
import { PostComponent } from 'src/app/dashboard/post/post.component';

import { NewTipComponent } from 'src/app/dashboard/new-tip/new-tip.component';
import { TipComponent } from 'src/app/dashboard/tip/tip.component';

import { NewProductComponent } from 'src/app/dashboard/new-product/new-product.component';
import { ProductComponent } from 'src/app/dashboard/product/product.component';

import { NewComboComponent } from 'src/app/dashboard/new-combo/new-combo.component';
import { ComboComponent } from 'src/app/dashboard/combo/combo.component';

import { NewPromotionComponent } from 'src/app/dashboard/new-promotion/new-promotion.component';
import { PromotionComponent } from 'src/app/dashboard/promotion/promotion.component';

import { NewFaqsComponent } from 'src/app/dashboard/new-faqs/new-faqs.component';
import { FaqsComponent } from 'src/app/dashboard/faqs/faqs.component';

import { NewTutorialComponent } from 'src/app/dashboard/new-tutorial/new-tutorial.component';
import { TutorialComponent } from 'src/app/dashboard/tutorial/tutorial.component';

import { PostCatComponent } from 'src/app/dashboard/post-cat/post-cat.component';

import { ProductCatComponent } from 'src/app/dashboard/product-cat/product-cat.component';

import { MessagesComponent } from 'src/app/dashboard/messages/messages.component';
import { MessageComponent } from 'src/app/dashboard/message/message.component';

import { PaymentsComponent } from 'src/app/dashboard/payments/payments.component';
import { PaymentComponent } from 'src/app/dashboard/payment/payment.component';

//Page Error
import { NoPageFoundComponent } from 'src/app/main/no-page-found/no-page-found.component';

const routes: Routes = [
	//main
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, data: {title: 'Home Page'} },
	{ path: 'about', component: AboutComponent, data: {title: 'About Us'} },
	{ path: 'board', component: BoardOfDirectorsComponent, data: {title: 'Board Of Directors'} },
	{ path: 'what-we-do', component: WhatWeDoComponent, data: {title: 'What We Do'} },
	{ path: 'contacts', component: ContactsComponent, data: {title: 'Contact Us'} },
	{ path: 'mobile', component: MobileAppComponent, data: {title: 'Mobile'} },
	{ path: 'faq', component: FaqComponent, data: {title: 'FAQ'} },
	{ path: 'terms-and-conditions', component: TermsAndConditionsComponent, data: {title: 'Terms And Conditions'} },
	{ path: 'privacy-policy', component: PrivacyPolicyComponent, data: {title: 'Privacy Policy'} },
	{ path: 'cookies-policy', component: CookiesPolicyComponent, data: {title: 'Cookies Policy'} },

	//farmer
	{ path: 'farmer-reg', component: FarmerRegComponent, data: {title: 'Farmer Registration'} },

	//vendor
	{ path: 'vendor-reg', component: VendorRegComponent, data: {title: 'Vendor Registration'} },

	//basket
	{ path: 'basket-create', component: BasketCreateComponent, data: {title: 'Create Basket'} },
	{ path: 'basket-summary', component: BasketSummaryComponent, data: {title: 'Summary Basket'} },

	//market
	{ path: 'market-place', component: MarketPlaceComponent, data: {title: 'Market Place'} },
	{ path: 'shop', component: ShopComponent, data: {title: 'Shop'} },

	//auth 
	{ path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
	{ path: 'sign-in', component: SignInComponent, data: {title: 'Sign In'} },
	{ path: 'sign-up', component: SignUpComponent, data: {title: 'Sign Up'} },
	{ path: 'forgot', component: SignUpComponent, data: {title: 'Forgot Password'} },
	{ path: 'verify', component: SignUpComponent, data: {title: 'Verify Email'} },

	//admin 
	{ path: 'new-recipe', component: NewRecipeComponent, data: {title: 'New Recipes'} },
	{ path: 'recipe/:recipeID', component: RecipeComponent, data: {title: 'Recipe'} },

	{ path: 'new-post', component: NewPostComponent, data: {title: 'New Post'} },
	{ path: 'post/:postID', component: PostComponent, data: {title: 'Post'} },

	{ path: 'new-tip', component: NewTipComponent, data: {title: 'New Tip'} },
	{ path: 'tip/:tipID', component: TipComponent, data: {title: 'Tip'} },

	{ path: 'new-product', component: NewProductComponent, data: {title: 'New Product'} },
	{ path: 'product/:productID', component: ProductComponent, data: {title: 'Product'} },

	{ path: 'new-combo', component: NewComboComponent, data: {title: 'New Combo'} },
	{ path: 'combo/:comboID', component: ComboComponent, data: {title: 'Combo'} },

	{ path: 'new-promotion', component: NewPromotionComponent, data: {title: 'New Promotion'} },
	{ path: 'promotion/:promotionID', component: PromotionComponent, data: {title: 'Promotion'} },

	{ path: 'new-faqs', component: NewFaqsComponent, data: {title: 'New FAQ'} },
	{ path: 'faqs/:faqID', component: FaqsComponent, data: {title: 'FAQs'} },

	{ path: 'new-tutorial', component: NewTutorialComponent, data: {title: 'New Tutorial'} },
	{ path: 'tutorial/:tutorialID', component: TutorialComponent, data: {title: 'Tutorial'} },

	{ path: 'post-cat/:postCatID', component: PostCatComponent, data: {title: 'Combo'} },

	{ path: 'product-cat/:productCatID', component: ProductCatComponent, data: {title: 'Product Category'} },

	{ path: 'messages', component: MessagesComponent, data: {title: 'Messages'} },
	{ path: 'messages/:messageID', component: MessagesComponent, data: {title: 'Messages'} },

	{ path: 'payments', component: PaymentsComponent, data: {title: 'payments'} },
	{ path: 'payments/:paymentID', component: PaymentsComponent, data: {title: 'payments'} },

	//error
	{ path: '**', component: NoPageFoundComponent, data: {title: 'Page Error'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
