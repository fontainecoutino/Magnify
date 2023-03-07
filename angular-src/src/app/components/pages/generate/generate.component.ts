import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { SpotifyArtist } from 'src/interfaces/spotify.interface';
import { SpotifySong } from 'src/interfaces/spotify.interface';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent {
  userLoggedIn = false;
  progress = 0;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.spotify.checkToken(params['auth_token']).then((valid) => {
        if (valid) {
          this.loadContent();
        } else {
          this.errorLoginIn();
        }
      });
    });

    
  }
  
  loadContent() {
    this.userLoggedIn = true;
    this.createPlaylist();
  }

  createPlaylist() {
    // get data set
    var artists: Map<string, number> = this.getTopArtists();
    var songs: string[] = this.getTopSongs(artists);
    this.progress += 25

    // get recommendations
    var artistRecommendedSongs: string[] = this.getArtistsRecomendations(artists);
    var songsRecommendedSongs: string[] = this.getSongsRecomendations(songs);
    this.progress += 25

    // tailor songs
    var tailoredArtistSongs: string[] = this.tailorSongs(artistRecommendedSongs, 5)
    var tailoredSongsSongs: string[] = this.tailorSongs(songsRecommendedSongs, 20)
    var playlistSongs: string[] = tailoredArtistSongs.concat(tailoredSongsSongs)
    this.progress += 25

    // get image
    this.progress += 25

    // create and publish playlist
    
  }

  tailorSongs(songs: string[], target: number) {
    var finalSongs:string[] = []
    for (var i = 0 ; i < target ; i++){
      finalSongs.push(songs[this.getRandomNumber(songs.length)])
    }
    return finalSongs;
  }

  getSongsRecomendations(songs: string[]) {
    var recommendedSongs: string[] = []

    for (var i = 0; i < 4 ; i++){
      var songsToRecommend: string[] = []
      for (var i = 0 ; i < 5 ; i++ ){
        songsToRecommend.push(songs[this.getRandomNumber(songs.length)])
      }
      // recommendation req (100, max_popularity .5)
      var recommendedSongsReq: string[] = []
      recommendedSongs = recommendedSongs.concat(recommendedSongs)
    }

    return recommendedSongs;
  }

  getArtistsRecomendations(artists: Map<string, number>) {
    // get top artists
    var topArtist: string[] = [];
    for (var entry of artists.entries()){
      var artist: string = entry[0];
      var ocurrances: number = entry[1];
      if (ocurrances > 2) {
        topArtist.push(artist)
      }
    }

    // get 5 recommendations from a randomly selected artist
    var artistsToRecommend: string[] = []
    for (var i = 0 ; i < 5 ; i++ ){
      var randIndex: number = this.getRandomNumber(topArtist.length);
      artistsToRecommend.push(topArtist[randIndex])
    }
    // recommendation req (100, max_popularity .5)
    const recommendedSongs: string[] = []

    return recommendedSongs;
  }

  getTopArtists() {
    // top artist req (50 rec, medium & long)
    const topArtistMed: SpotifyArtist[] = []
    const topArtistLong: SpotifyArtist[] = []
    const topArtist: SpotifyArtist[] = topArtistMed.concat(topArtistLong)

    var artists: Map<string, number> = new Map();
    for (var artist of topArtist){
      if (!artists.has(artist.id)){
        artists.set(artist.id, 0)
      }
      artists.set(artist.id, (artists.get(artist.id) || 0) + 1)
    }
    return artists
  }

  getTopSongs(artists: Map<string, number>) {
    // top songs req (50 rec, medium & long)
    const topSongsMed: SpotifySong[] = []
    const topSongsLong: SpotifySong[] = []
    const topSongs: SpotifySong[] = topSongsMed.concat(topSongsLong)

    var songs: string[] = []
    for (var song of topSongs){
      songs.push(song.id)
      for (var artist of song.artists){
        if (!artists.has(artist.id)){
          artists.set(artist.id, 0)
        }
        artists.set(artist.id, (artists.get(artist.id) || 0) + 1)
      }
    }
    return songs;
  }

  errorLoginIn() {
    console.log('There was an error during the authentication');
    //this.router.navigate([ '/' ])
  }

  private getRandomNumber(max: number) {
    return Math.floor(Math.random() * max)
  }

}
