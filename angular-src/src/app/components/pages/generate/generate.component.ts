import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { AvailableGenreSeeds, SpotifyArtist } from 'src/interfaces/spotify.interface';
import { SpotifySong } from 'src/interfaces/spotify.interface';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
})
export class GenerateComponent {
  
  auth_token = "";
  id = "";
  
  userLoggedIn = false;
  progress = 0;

  ArtistsList: Map<string, SpotifyArtist> = new Map();
  SongsList: Map<string, SpotifySong> = new Map();

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.auth_token = params['auth_token'];
      this.id = params['user_id'];
      this.spotify.checkToken(this.auth_token).then((valid) => {
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

  async createPlaylist() {
    console.log('creating playlist ...')
    // get data set
    var artists: Map<string, number> = await this.getTopArtists();
    var songs: string[] = await this.getTopSongs(artists);
    this.progress += 20

    // get recommendations
    var artistRecommendedSongs: SpotifySong[] = await this.getArtistsRecomendations(artists);
    var songsRecommendedSongs: SpotifySong[] = await this.getSongsRecomendations(songs);
    this.progress += 20

    // tailor songs
    var tailoredArtistSongs: SpotifySong[] = this.tailorArray(artistRecommendedSongs, 5)
    var tailoredSongsSongs: SpotifySong[] = this.tailorArray(songsRecommendedSongs, 20)
    var playlistSongs: SpotifySong[] = tailoredArtistSongs.concat(tailoredSongsSongs)
    playlistSongs = this.shufflePlaylist(playlistSongs)


    // create and publish playlist
    this.publishPlaylist(playlistSongs)
    this.progress += 20

    // get image
    this.progress += 20
    
  }
  
  async publishPlaylist(playlist: SpotifySong[]) {
    console.log(playlist)
    var playlistId = (await this.spotify.createPlaylist(this.auth_token, this.id ,"pano-shein")).id

    var uris: string[] = []
    for (var song of playlist){
      uris.push(`${song.uri}`)
    }
    this.spotify.addItemToPlaylist(this.auth_token, playlistId, uris)

  }

  async getSongsRecomendations(songs: string[]) {
    var recommendedSongs: SpotifySong[] = []

    for (let i = 0; i < 4 ; i++){
      let songsToRecommend: SpotifySong[] = this.tailorArray(songs, 5);
      let seedSongs = songsToRecommend.join(",")
      let recommendedSongsReq: SpotifySong[] = (await this.spotify.getRecommendations(this.auth_token, ",", seedSongs, "100", "50")).tracks
      recommendedSongs = recommendedSongs.concat(recommendedSongsReq)
      this.progress += 5
    }

    return recommendedSongs;
  }

  async getArtistsRecomendations(artists: Map<string, number>) {
    // get top artists
    var topArtist: string[] = [];
    for (let entry of artists.entries()){
      let artist: string = entry[0];
      let ocurrances: number = entry[1];
      if (ocurrances > 2) {
        topArtist.push(artist)
      }
    }

    // get 5 randomly selected artist
    var artistsToRecommend: string[] = this.tailorArray(topArtist, 5)
    var seedArtist = artistsToRecommend.join(",")

    // get their genres
    // var seedGenresList: string[] = []
    // for (let artist of artistsToRecommend){
    //   var genres = this.ArtistsList.get(artist)?.genres
    //   if (genres){
    //     var genresToConcat: string[] = []
    //     for (var genre of genres){
    //       if (AvailableGenreSeeds.validGenre(genre)) genresToConcat.push(genre);
    //     }
    //     seedGenresList = seedGenresList.concat(genresToConcat) 
    //   }
    // }
    // seedGenresList = this.tailorArray(seedGenresList, 5)
    // var seedGerne = seedGenresList.join(",")

    // get song list seeds
    // var seedSongsList: string[] = []
    // for (var song of this.SongsList.entries()){
    //   var songId = song[0]
    //   var songArtists = song[1].artists
    //   for (let artist of songArtists){
    //     if (artistsToRecommend.includes(artist.id)) seedSongsList.push(songId);
    //   }
    // }
    // seedSongsList = this.tailorArray(seedSongsList, 5)
    // var seedSong = seedSongsList.join(",")

    const recommendedSongs: SpotifySong[] = (await this.spotify.getRecommendations(this.auth_token, seedArtist, ",", "100", "50")).tracks;
    this.progress += 5
    return recommendedSongs;
  }

  async getTopArtists() {
    // top artist req (50 rec, medium & long)
    const topArtistMed: SpotifyArtist[] = (await this.spotify.getTopItem(this.auth_token, "artists", "50", "medium_term")).items
    const topArtistLong: SpotifyArtist[] = (await this.spotify.getTopItem(this.auth_token, "artists", "50", "long_term")).items
    const topArtist: SpotifyArtist[] = topArtistMed.concat(topArtistLong)

    var artists: Map<string, number> = new Map();
    for (var artist of topArtist){
      if (!artists.has(artist.id)){
        artists.set(artist.id, 0)
      }
      artists.set(artist.id, (artists.get(artist.id) || 0) + 1)
      this.ArtistsList.set(artist.id, artist)
    }
    return artists
  }

  async getTopSongs(artists: Map<string, number>) {
    // top songs req (50 rec, medium & long)
    const topSongsMed: SpotifySong[] = (await this.spotify.getTopItem(this.auth_token, "tracks", "50", "medium_term")).items
    const topSongsLong: SpotifySong[] = (await this.spotify.getTopItem(this.auth_token, "tracks", "50", "long_term")).items
    const topSongs: SpotifySong[] = topSongsMed.concat(topSongsLong)

    var songs: string[] = []
    for (var song of topSongs){
      songs.push(song.id)
      this.SongsList.set(song.id, song)
      for (var artist of song.artists){
        if (!artists.has(artist.id)){
          artists.set(artist.id, 0)
        }
        artists.set(artist.id, (artists.get(artist.id) || 0) + 1)
        if (!this.ArtistsList.has(artist.id)){
          this.ArtistsList.set(artist.id, artist)
        }
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

  private tailorArray(array: any[], target: number) {
    var finalArray:any[] = []
    while (finalArray.length < target){
      let toAdd = array[this.getRandomNumber(array.length)]
      if (!finalArray.includes(toAdd)) finalArray.push(toAdd)
    }
    return finalArray;
  }

  private shufflePlaylist(playlist:SpotifySong[]) {
    let shuffledPlaylist:SpotifySong[] = [];
    while (playlist.length > 0){
      let randIndex = this.getRandomNumber(playlist.length)
      shuffledPlaylist.push(playlist[randIndex])
      playlist.splice(randIndex,1)
    }
    return shuffledPlaylist
  }
}
