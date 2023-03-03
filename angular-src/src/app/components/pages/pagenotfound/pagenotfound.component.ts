import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {
  danceGifPath = "../../assets/dance.gif"
  constructor( private router: Router ) { }
  onTakeHome(){
    this.router.navigate([ '/' ])
  }
}
