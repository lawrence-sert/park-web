import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { CanonicalService } from './services/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public router: Router,  
    private activatedRoute: ActivatedRoute,
    private metaTagService: Meta,
    private canonicalService: CanonicalService
    ) { 

  }

  ngOnInit() { 
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Lawrence Gumbo' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-02-17', scheme: 'YYYY-MM-DD' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'SERT' },
      { property: 'og:description', content: 'SERT is a full on-line service company that provides our clients with web' },
      { property: 'og:url', content: 'https://www.sert.rw/' },
      { property: 'og:site_name', content: 'SERT' },
      { property: 'og:image', content: 'https://www.sert.rw/img/seo/sert-logo-300x300.png' },
      { property: 'og:image:width', content: '300' },
      { property: 'og:image:height', content: '300' },
      { name: 'twitter:card', content:'summary' },
      { name: 'twitter:description', content:'twitter description' },
      { name: 'twitter:creator', content:'@sertrw1' },
      { name: 'twitter:url', content:'https://www.sert.rw/' },
      { name: 'twitter:image', content: 'https://www.sert.rw/img/twitter_image.png' },

      { charset: 'UTF-8' },

      ]);

    this.canonicalService.setCanonicalURL();
  } 
}



