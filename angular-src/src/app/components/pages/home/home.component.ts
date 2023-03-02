import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  stateKey = 'spotify_auth_state';

  params: any;
  access_token: string | null;;
  state: string | null;;
  storedState: string | null;

  constructor(private http: HttpClient) {
    this.access_token = "";
    this.state = "";
    this.storedState = "";
  }

  ngOnInit() {
    this.params = this.getHashParams();

    this.access_token = this.params.access_token,
    this.state = this.params.state,
    this.storedState = localStorage.getItem(this.stateKey);

    if (this.access_token && (this.state == null || this.state !== this.storedState)) {
      alert('There was an error during the authentication');
    } else {
      localStorage.removeItem(this.stateKey);
      if (this.access_token) {
        var url = 'https://api.spotify.com/v1/me';

        this.http.get(url, {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.access_token})})
        .pipe(
          tap( // Log the result or error
          {
            next: (data) => console.log(data),
            error: (error) => console.log(error)
          }
          )
        );
        
      } else {
          console.log('sucess!')
      }
    }
  }

  onLogin() {
    var client_id = 'c8c919c8954e4355a1cab6d9ff7b8974'; // Your client id
    var redirect_uri = 'http://localhost:3000'; // Your redirect uri

    var state = this.generateRandomString(16);

    localStorage.setItem(this.stateKey, state);
    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location.href = url;
  }
    

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  private getHashParams() {
    // var hashParams = {};
    // var e, r = /([^&;=]+)=?([^&;]*)/g,
    //     q = window.location.hash.substring(1);
    // while ( e = r.exec(q)) {
    //     hashParams[e[1]] = decodeURIComponent(e[2]);
    // }
    // return hashParams;

    // var hash = window.location.hash.substr(1);

    // var result = hash.split('&').reduce(function (res, item) {
    //     var parts = item.split('=');
    //     res[parts[0]] = parts[1];
    //     return res;
    // }, {});
  }

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  private generateRandomString(length: number) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
}
