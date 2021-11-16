// Credits: https://github.com/leerob/leerob.io/blob/main/lib/spotify.ts
export type Views = {
  total: number;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type TopTracks = {
  tracks: Array<Song>;
};

export type YouTube = {
  subscriberCount: number;
  viewCount: number;
};

export type GitHub = {
  followers: number;
  stars: number;
};
