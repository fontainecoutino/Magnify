import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  access_token = "";
  username = "";

  userLoggedIn = false;
  shouldLoadFadeIn = true;
  shouldLoadFadeOut = false;
  shouldContentFadeIn = false;
  shouldContentFadeLeft = false;
  showDescription = false;
  showAlgorithmDescription = false;
  showCustomizeDescription = false;
  showMagnifyDescription = false;

  constructor(private router: Router, private spotify: SpotifyService ) {
    this.access_token = "";
  }

  ngOnInit() {
    if (this.getHashParams()){   // log in to spotify was succesful
      this.shouldLoadFadeOut = true;

      this.spotify.checkToken(this.access_token).then((value)=>{
        if (value) {
          this.loadContent()
        } else {
          this.errorLoginIn()
        }
      })

    } else { // not logged in so login to spotify
      this.spotify.clientLogIn()
    }
  }

  loadContent(){
    this.spotify.getUserProfileName(this.access_token).then((res)=>{
      this.username = res;
    })
    this.userLoggedIn = true;
    this. shouldContentFadeIn = true;
    
  }

  errorLoginIn() {
    console.log('There was an error during the authentication');
    //this.router.navigate([ '/' ])
  }

  onCreate(){
    this.router.navigate([ '/generate' ], {queryParams: { auth_token: this.access_token }})
  }

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  private getHashParams() {
    var parameters = this.router.parseUrl(this.router.url).fragment;

    if (parameters){
      var parametersList = parameters.split("&")

      for (var parameterPair of parametersList){
        var parameterPairSplit = parameterPair.split('=');
        if (parameterPairSplit.length != 2) continue;
        
        var parameterName = parameterPairSplit[0]
        var parameterValue = parameterPairSplit[1]
        if (parameterName == "access_token"){
          this.access_token = parameterValue;
        }
      }
      return true
    } else {
      return false
    }
  }
}
