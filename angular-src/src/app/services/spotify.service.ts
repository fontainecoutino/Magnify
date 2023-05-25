import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment/environment";
import { SpotifyUserProfile } from 'src/interfaces/spotify.interface';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

    userProfile: SpotifyUserProfile | undefined = undefined

    constructor (){}

    // AUTH
    clientLogIn() {
        var client_id = environment.spotifyClientID ||  "";
        var redirect_uri = environment.spotifyRedirctURI || "";

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
      let result = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` }})
      let resultJson = await result.json()
      this.userProfile = resultJson;
      return await resultJson;
    }

    getUserProfileName(){
      return this.userProfile?.display_name
    }

    getUserProfileId(){
      return this.userProfile?.id
    }

    // TOP
    async getTopItem(token: string, type: string, limit:string, timeRange: string){
      var url = 'https://api.spotify.com/v1/me/top/' + type 
      url += '?' + new URLSearchParams({ 'limit': limit, 'time_range': timeRange }).toString();
      const result = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` }})
      return await result.json();
    }

    // RECOMMENDATIONS
    async getRecommendations(token: string, seedArtists: string, seedTracks: string, limit: string = '20', maxPopularity: string = '100') {
      const queryString = new URLSearchParams({ 
        'seed_artists': seedArtists,
        'seed_genres': ",",
        'seed_tracks': seedTracks,
        'limit': limit,
        'maxPopularity': maxPopularity }).toString();
      const url = `https://api.spotify.com/v1/recommendations?${queryString}`;
      const headers = { Authorization: `Bearer ${token}` };
      const result = await fetch(url, { method: "GET", headers: headers });
      const data = await result.json();
      return data;
    }

    // PLAYLIST
    async createPlaylist(token: string, userId: string, name: string ){
      let url = `https://api.spotify.com/v1/users/${userId}/playlists`
      let headers = { 'Authorization': 'Bearer ' + token};
      let body = { "name": name, "description": "", "public": false };
      let result = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(body)})
      return await result.json();
    }

    async addItemToPlaylist(token: string, playlist_id: string, uris: string[]){
      let url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
      let headers = { 'Authorization': 'Bearer ' + token};
      let body = { "uris": uris };
      let result = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(body)})
      return await result.json();
    }

    async getPlaylistEmbeded(href:string){
      let url = `https://open.spotify.com/oembed?url=${href}`
      let result = await fetch(url, { method: "GET"})
      return await result.json();
    }
}