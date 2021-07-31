import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'park-web';

  constructor(

    public router: Router,  
    private activatedRoute: ActivatedRoute,  
   
    ) { 

  }

  ngOnInit() { 
 
    } 
}
