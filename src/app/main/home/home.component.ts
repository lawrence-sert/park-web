import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Title, Meta } from '@angular/platform-browser';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	title = 'Cook Africa';

	posts: any;
	postsCat: any;

	constructor(
		private toastr: ToastrService,
		private titleService: Title,
		private metaTagService: Meta

		) { }

	ngOnInit(): void {
		//set title for every page
		this.titleService.setTitle(this.title);
		this.metaTagService.updateTag(
			{ name: 'description', content: 'Add song template' }
			);
		// this.toastr.success('Hello world!', 'Toastr fun!');
	}

}
