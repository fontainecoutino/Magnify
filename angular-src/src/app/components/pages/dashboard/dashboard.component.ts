import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  access_token: string | null;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute ) {
    this.access_token = "";
  }

  ngOnInit() {
    if (this.getHashParams()){   // log in to spotify was succesful
      if (this.access_token) {
        this.getProfileInfo()
      } else {
        this.errorLoginIn()
      }

    } else { // not logged in so login to spotify
      this.spotifyClientLogIn()
    }
  }
  
  errorLoginIn() {
    console.log('There was an error during the authentication');
    this.router.navigate([ '/' ])
  }

  getProfileInfo() {
    var url = 'https://api.spotify.com/v1/me';
    console.log("here", url, this.access_token)

    var req = this.http.get(url, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.access_token})})
    
    req.subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => console.error(e)
    })
  }

  private spotifyClientLogIn() {
    var client_id = environment.spotifyClientID;
    var redirect_uri = environment.spotifyRedirctURI;

    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

    window.location.href = url;
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
