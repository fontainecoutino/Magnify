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
  id = "";

  userLoggedIn = false;
  errorMsg = "";
  error = false;

  shouldContentFadeIn = false;
  shouldContentFadeLeft = false;
  showDescription = false;
  showAlgorithmDescription = false;
  showCustomizeDescription = false;
  showMagnifyDescription = false;
  shouldFadeOut = false;

  constructor(private router: Router, private spotify: SpotifyService ) {
    this.access_token = "";
  }

  ngOnInit() {
    if (this.getHashParams()){   // log in to spotify was succesful
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
    this.username = (this.spotify.getUserProfileName() || "there");
    this.id = (this.spotify.getUserProfileId() || "");
    this.userLoggedIn = true;
    this.shouldContentFadeIn = true;
    
  }

  errorLoginIn() {
    this.errorMsg = 'Authentication error.';
    this.error = true;
  }

  async onCreate(){
    this.shouldFadeOut = true;
    await this.sleep(.5);
    this.router.navigate([ '/generate' ], {queryParams: { auth_token: this.access_token, user_id: this.id }})
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

  async sleep(seconds: number){
    await new Promise(resolve => {
      return setTimeout(resolve, seconds * 1000)
    });
  }
}
