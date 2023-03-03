import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  shouldFadeOut = false;
  constructor( private router: Router ) { }
  onLogin(){
    this.shouldFadeOut = true;
    this.sleep(.5);
    console.log('here')
    this.router.navigate([ '/dashboard' ])
  }

  async sleep(seconds: number){
    await new Promise(resolve => {
      return setTimeout(resolve, seconds * 1000)
  });
  }
  
}
