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