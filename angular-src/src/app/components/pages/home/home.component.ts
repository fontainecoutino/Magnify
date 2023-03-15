import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  shouldFadeOut = false;
  error = true
  constructor( private router: Router ) { }
  async onLogin(){
    this.shouldFadeOut = true;
    await this.sleep(.5);
    this.router.navigate([ '/dashboard' ])
  }

  async sleep(seconds: number){
    await new Promise(resolve => {
      return setTimeout(resolve, seconds * 1000)
  });
  }
}
