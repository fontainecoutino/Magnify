import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment/environment";
import { SpotifyUserProfile } from 'src/interfaces/spotify.interface';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

    constructor (private http: HttpClient){}

    // AUTH
    clientLogIn() {
        var client_id = environment.spotifyClientID;
        var redirect_uri = environment.spotifyRedirctURI;

        var scopes: string[] = [
        'user-read-private', 'user-read-email', 'ugc-image-upload', 'playlist-read-private',
        'playlist-read-collaborative', 'user-library-modify', 'playlist-modify-private',
        'playlist-modify-public', 'user-top-read', 'user-read-recently-played', 'user-library-read'];
        var scope = scopes.join(' ');

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

        window.location.href = url;
    }

    async checkToken(token: string) {
      const profile = await this.getUserProfile(token);
      return profile.display_name != undefined
    }

    // USER
    async getUserProfile(token: string) {
      var url = 'https://api.spotify.com/v1/me';
      const result = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` }})
      return await result.json();
    }

    getUserProfileName(token: string){
      return this.getUserProfile(token).then((res: SpotifyUserProfile) => { return res.display_name; })
    }

    // TOP
    async getTopItem(token: string, type: string, limit:string, timeRange: string){
      var url = 'https://api.spotify.com/v1/me/top/' + type 
      url += '?' + new URLSearchParams({ 'limit': limit, 'time_range': timeRange }).toString();
      const result = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` }})
      return await result.json();
    }

    // RECOMMENDATIONS
    async getRecommendations(token: string, seedArtists: string, seedTracks: string, limit:string, maxPopularity: string){
      var url = 'https://api.spotify.com/v1/recommendations'
      url += '?' + new URLSearchParams({ 
        'seed_artists': seedArtists,
        'seed_genres': ",",
        'seed_tracks': seedTracks,
        'limit': limit,
        'maxPopularity': maxPopularity }).toString();
      const result = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` }})
      return await result.json();
    }

    // CREATE PLAYLIST
    
}