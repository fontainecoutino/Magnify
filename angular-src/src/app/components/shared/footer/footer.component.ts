import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  fontainesPage: string;
  privacyPage: string;
  
  constructor(){
    this.fontainesPage = "https://google.com"
    this.privacyPage = "https://google.com"
  }

  openFontainesPage(){
    window.location.href = this.fontainesPage;
  }

  openPrivacyCookiePage(){
    window.location.href = this.fontainesPage;
  }
}
