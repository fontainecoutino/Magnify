import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css']
})
export class HelpPageComponent {
  constructor( private router: Router ) { }
  onLogin(){
    this.router.navigate([ '/dashboard' ])
  }
}
