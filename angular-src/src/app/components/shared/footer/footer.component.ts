import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  fontainesPage: string;
  privacyPage: string;
  
  constructor( private router: Router  ){
    this.fontainesPage = "https://google.com"
    this.privacyPage = "https://google.com"
  }

  openFontainesPage(){
    window.location.href = this.fontainesPage;
  }

  openPrivacyCookiePage(){
    this.router.navigate([ '/privacy' ])
  }
}
