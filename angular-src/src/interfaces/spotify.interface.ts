export interface SpotifyUserProfile {
  country: string;
  display_name: string;
  email: string;
  href: string;
  id: string;
  images: SpotifyImage[];
  product: string;
  type: string;
  uri: string;
}

export  interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  uri: string;
}

export interface SpotifyAlbum{
  album_type: string;
  total_tracks: number;
  href: string;
  id: string;
  images: SpotifyImage[];
  name:string;
  type: string;
  uri: string;
  genres: string[];
  popularity: number;
}

export interface SpotifySong {
  album: SpotifyAlbum[];
  artists: SpotifyArtist[];
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  uri: string;
}

export class AvailableGenreSeeds {
  static validGenre(genre: string): boolean {
    var genres: string[] = [
      "acoustic",
      "afrobeat",
      "alt-rock",
      "alternative",
      "ambient",
      "anime",
      "black-metal",
      "bluegrass",
      "blues",
      "bossanova",
      "brazil",
      "breakbeat",
      "british",
      "cantopop",
      "chicago-house",
      "children",
      "chill",
      "classical",
      "club",
      "comedy",
      "country",
      "dance",
      "dancehall",
      "death-metal",
      "deep-house",
      "detroit-techno",
      "disco",
      "disney",
      "drum-and-bass",
      "dub",
      "dubstep",
      "edm",
      "electro",
      "electronic",
      "emo",
      "folk",
      "forro",
      "french",
      "funk",
      "garage",
      "german",
      "gospel",
      "goth",
      "grindcore",
      "groove",
      "grunge",
      "guitar",
      "happy",
      "hard-rock",
      "hardcore",
      "hardstyle",
      "heavy-metal",
      "hip-hop",
      "holidays",
      "honky-tonk",
      "house",
      "idm",
      "indian",
      "indie",
      "indie-pop",
      "industrial",
      "iranian",
      "j-dance",
      "j-idol",
      "j-pop",
      "j-rock",
      "jazz",
      "k-pop",
      "kids",
      "latin",
      "latino",
      "malay",
      "mandopop",
      "metal",
      "metal-misc",
      "metalcore",
      "minimal-techno",
      "movies",
      "mpb",
      "new-age",
      "new-release",
      "opera",
      "pagode",
      "party",
      "philippines-opm",
      "piano",
      "pop",
      "pop-film",
      "post-dubstep",
      "power-pop",
      "progressive-house",
      "psych-rock",
      "punk",
      "punk-rock",
      "r-n-b",
      "rainy-day",
      "reggae",
      "reggaeton",
      "road-trip",
      "rock",
      "rock-n-roll",
      "rockabilly",
      "romance",
      "sad",
      "salsa",
      "samba",
      "sertanejo",
      "show-tunes",
      "singer-songwriter",
      "ska",
      "sleep",
      "songwriter",
      "soul",
      "soundtracks",
      "spanish",
      "study",
      "summer",
      "swedish",
      "synth-pop",
      "tango",
      "techno",
      "trance",
      "trip-hop",
      "turkish",
      "work-out",
      "world-music"
    ]
    return genres.includes(genre)
  }
}